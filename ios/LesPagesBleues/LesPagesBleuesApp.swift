import SwiftUI

/// Les Pages Bleues — application iOS.
/// Le site complet est embarqué dans l'application (dossier « Site », copié à chaque compilation
/// depuis la racine du dépôt) : tout fonctionne hors ligne et les données restent sur l'iPhone.
@main
struct LesPagesBleuesApp: App {
    var body: some Scene {
        WindowGroup {
            SiteView()
                .ignoresSafeArea()               // le site gère lui-même les zones sûres (viewport-fit=cover)
                .background(Color(red: 5 / 255, green: 11 / 255, blue: 24 / 255))
        }
    }
}
