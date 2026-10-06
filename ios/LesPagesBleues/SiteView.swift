import SwiftUI
import UIKit
import WebKit

extension UIColor {
    /// Fond des pages : clair (#f4f7fb) ou bleu nuit (#0a1426), selon le thème affiché
    static let lpbBackground = UIColor { traits in
        traits.userInterfaceStyle == .dark
            ? UIColor(red: 10 / 255, green: 20 / 255, blue: 38 / 255, alpha: 1)
            : UIColor(red: 244 / 255, green: 247 / 255, blue: 251 / 255, alpha: 1)
    }
}

/// Affiche le site embarqué dans une WKWebView et fait le lien avec iOS :
/// liens externes et e-mails ouverts dans Safari / Mail, confirmations, impression,
/// fichiers exportés (carnet, données, rappels) proposés dans la feuille de partage,
/// thème choisi sur le site (automatique, clair, sombre) appliqué à la barre d'état.
struct SiteView: UIViewRepresentable {
    static let themeKey = "lpb-theme"

    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.setURLSchemeHandler(SiteSchemeHandler(), forURLScheme: SiteSchemeHandler.scheme)
        config.websiteDataStore = .default()                 // stockage local conservé entre les lancements
        config.allowsInlineMediaPlayback = true

        let controller = WKUserContentController()
        // Signale au site qu'il tourne dans l'app, et branche window.print() sur l'impression iOS
        controller.addUserScript(WKUserScript(
            source: "window.LPB_APP = 'ios'; window.print = function () { window.webkit.messageHandlers.print.postMessage(null); };",
            injectionTime: .atDocumentStart, forMainFrameOnly: true))
        controller.add(context.coordinator, name: "print")
        controller.add(context.coordinator, name: "theme")
        config.userContentController = controller

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.uiDelegate = context.coordinator
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = false
        webView.backgroundColor = .lpbBackground
        webView.scrollView.backgroundColor = .lpbBackground
        if #available(iOS 16.4, *) { webView.isInspectable = true }   // inspection depuis Safari sur le Mac
        context.coordinator.webView = webView
        webView.load(URLRequest(url: SiteSchemeHandler.startURL))
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler, WKDownloadDelegate {
        weak var webView: WKWebView?
        private var downloads: [ObjectIdentifier: URL] = [:]

        // MARK: Navigation

        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = action.request.url, let scheme = url.scheme?.lowercased() else {
                decisionHandler(.cancel); return
            }
            if action.shouldPerformDownload { decisionHandler(.download); return }
            switch scheme {
            case SiteSchemeHandler.scheme, "about", "blob", "data":
                decisionHandler(.allow)
            default:
                // Sites externes, mailto:, tel: → ouverts par iOS (Safari, Mail…)
                UIApplication.shared.open(url)
                decisionHandler(.cancel)
            }
        }

        func webView(_ webView: WKWebView, decidePolicyFor response: WKNavigationResponse,
                     decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
            decisionHandler(response.canShowMIMEType ? .allow : .download)
        }

        func webView(_ webView: WKWebView, navigationAction: WKNavigationAction, didBecome download: WKDownload) {
            download.delegate = self
        }

        func webView(_ webView: WKWebView, navigationResponse: WKNavigationResponse, didBecome download: WKDownload) {
            download.delegate = self
        }

        // Liens target="_blank" : externes dans Safari, internes dans la même vue
        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                     for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            if let url = action.request.url {
                if url.scheme?.lowercased() == SiteSchemeHandler.scheme { webView.load(action.request) }
                else { UIApplication.shared.open(url) }
            }
            return nil
        }

        // MARK: alert() et confirm()

        func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                     initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
            let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler() })
            present(alert, fallback: completionHandler)
        }

        func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String,
                     initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
            let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "Annuler", style: .cancel) { _ in completionHandler(false) })
            alert.addAction(UIAlertAction(title: "Confirmer", style: .destructive) { _ in completionHandler(true) })
            present(alert, fallback: { completionHandler(false) })
        }

        // MARK: Thème (envoyé par le site à chaque page : "auto", "light" ou "dark")

        /// Applique le thème mémorisé à la fenêtre : la barre d'état et le fond suivent le choix fait sur le site
        func applyTheme(_ pref: String? = nil) {
            let value = pref ?? UserDefaults.standard.string(forKey: SiteView.themeKey) ?? "auto"
            let style: UIUserInterfaceStyle = value == "light" ? .light : value == "dark" ? .dark : .unspecified
            webView?.window?.overrideUserInterfaceStyle = style
        }

        func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
            applyTheme()
        }

        // MARK: Impression (window.print)

        func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "theme", let pref = message.body as? String {
                UserDefaults.standard.set(pref, forKey: SiteView.themeKey)
                applyTheme(pref)
                return
            }
            guard message.name == "print", let webView else { return }
            let printer = UIPrintInteractionController.shared
            let info = UIPrintInfo(dictionary: nil)
            info.jobName = webView.title ?? "Les Pages Bleues"
            info.outputType = .general
            printer.printInfo = info
            printer.printFormatter = webView.viewPrintFormatter()
            printer.present(animated: true)
        }

        // MARK: Fichiers exportés → feuille de partage

        func download(_ download: WKDownload, decideDestinationUsing response: URLResponse,
                      suggestedFilename: String, completionHandler: @escaping (URL?) -> Void) {
            let folder = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString, isDirectory: true)
            try? FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
            let file = folder.appendingPathComponent(suggestedFilename.isEmpty ? "export" : suggestedFilename)
            downloads[ObjectIdentifier(download)] = file
            completionHandler(file)
        }

        func downloadDidFinish(_ download: WKDownload) {
            guard let file = downloads.removeValue(forKey: ObjectIdentifier(download)) else { return }
            let share = UIActivityViewController(activityItems: [file], applicationActivities: nil)
            if let view = webView {
                share.popoverPresentationController?.sourceView = view
                share.popoverPresentationController?.sourceRect = CGRect(x: view.bounds.midX, y: view.bounds.midY, width: 1, height: 1)
            }
            present(share, fallback: {})
        }

        func download(_ download: WKDownload, didFailWithError error: Error, resumeData: Data?) {
            downloads.removeValue(forKey: ObjectIdentifier(download))
        }

        // MARK: Outils

        private func present(_ controller: UIViewController, fallback: @escaping () -> Void) {
            guard var top = webView?.window?.rootViewController else { fallback(); return }
            while let next = top.presentedViewController { top = next }
            top.present(controller, animated: true)
        }
    }
}
