import Foundation
import UniformTypeIdentifiers
import WebKit

/// Sert les fichiers du site embarqué sous l'adresse lpb://app/… (au lieu de file://), pour que
/// le stockage local, fetch() et les liens relatifs se comportent comme sur un vrai site web.
final class SiteSchemeHandler: NSObject, WKURLSchemeHandler {
    static let scheme = "lpb"
    static let host = "app"
    static var startURL: URL { URL(string: "\(scheme)://\(host)/index.html")! }

    private let root: URL? = Bundle.main.resourceURL?.appendingPathComponent("Site", isDirectory: true)

    func webView(_ webView: WKWebView, start task: WKURLSchemeTask) {
        guard let url = task.request.url, let root else {
            task.didFailWithError(URLError(.fileDoesNotExist))
            return
        }
        var path = url.path.removingPercentEncoding ?? url.path
        // La page 404 utilise des chemins absolus prévus pour GitHub Pages (/LesPagesBleues/…)
        if path.hasPrefix("/LesPagesBleues/") { path = String(path.dropFirst("/LesPagesBleues".count)) }
        if path.isEmpty || path.hasSuffix("/") { path += "index.html" }

        var file = root.appendingPathComponent(String(path.drop(while: { $0 == "/" })))
        var status = 200
        var isDir: ObjCBool = false
        let exists = FileManager.default.fileExists(atPath: file.path, isDirectory: &isDir)
        // Sécurité : jamais en dehors du dossier du site ; page introuvable sinon
        if !exists || isDir.boolValue || !file.standardizedFileURL.path.hasPrefix(root.standardizedFileURL.path) {
            file = root.appendingPathComponent("404.html")
            status = 404
        }

        do {
            let data = try Data(contentsOf: file)
            let mime = Self.mimeType(for: file.pathExtension)
            let headers = [
                "Content-Type": mime,
                "Content-Length": String(data.count),
                "Cache-Control": "no-cache"
            ]
            let response = HTTPURLResponse(url: url, statusCode: status, httpVersion: "HTTP/1.1", headerFields: headers)!
            task.didReceive(response)
            task.didReceive(data)
            task.didFinish()
        } catch {
            task.didFailWithError(error)
        }
    }

    func webView(_ webView: WKWebView, stop task: WKURLSchemeTask) {}

    static func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html": return "text/html; charset=utf-8"
        case "js": return "text/javascript; charset=utf-8"
        case "css": return "text/css; charset=utf-8"
        case "json", "webmanifest": return "application/json; charset=utf-8"
        case "svg": return "image/svg+xml"
        case "webp": return "image/webp"
        case "png": return "image/png"
        case "woff2": return "font/woff2"
        case "xml": return "application/xml"
        case "txt": return "text/plain; charset=utf-8"
        default: return UTType(filenameExtension: ext)?.preferredMIMEType ?? "application/octet-stream"
        }
    }
}
