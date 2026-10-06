/* Schémas techniques des fiches — fichier produit par tools/illustrations.js (ne pas modifier à la main).
   Seuls les schémas relus et jugés justes figurent ici ; les autres fiches gardent leur photo
   (relecture : tools/data/illustrations-review.json, bilan : docs/visuels/AUDIT.md).
   w, h : taille du dessin ; reperes : légende, dans l'ordre des numéros ;
   modelSpecific : la conception dépend du modèle (le pack le précise) ;
   variants : variantes marque / modèle, uniquement vérifiées sur une source fiable (aucune pour l'instant). */
const ILLUSTRATIONS = {
  "plaquettes-frein": { w: 580, h: 427, reperes: ["Disque", "Étrier", "Plaquette", "Moyeu"], modelSpecific: false, variants: [] },
  "changer-batterie-voiture": { w: 555, h: 372, reperes: ["Borne +", "Borne –", "Batterie"], modelSpecific: false, variants: [] },
  "niveau-huile-moteur": { w: 452, h: 395, reperes: ["Bouchon", "Jauge", "Niveau"], modelSpecific: false, variants: [] },
  "detartrer-bouilloire": { w: 476, h: 297, reperes: ["Cuve", "Anse"], modelSpecific: true, variants: [] },
  "lave-linge-ne-demarre-plus": { w: 490, h: 467, reperes: ["Écran et touches", "Porte (hublot)", "Tambour"], modelSpecific: true, variants: [] },
  "ordinateur-portable-chauffe": { w: 610, h: 390, reperes: ["Écran", "Aérations (côtés, arrière ou dessous)"], modelSpecific: true, variants: [] },
  "ecran-telephone": { w: 390, h: 447, reperes: ["Écran", "Châssis"], modelSpecific: true, variants: [] },
  "tondeuse-ne-demarre-pas": { w: 424, h: 379, reperes: ["Moteur", "Carter"], modelSpecific: true, variants: [] },
  "joystick-drift": { w: 430, h: 305, reperes: ["Stick gauche", "Stick droit"], modelSpecific: true, variants: [] },
  "recoller-semelle": { w: 440, h: 212, reperes: ["Ligne de collage", "Semelle"], modelSpecific: false, variants: [] },
  "barbecue-gaz-fuite-nettoyage": { w: 430, h: 300, reperes: ["Grille", "Arrivée gaz"], modelSpecific: true, variants: [] },
  "volant-jeu-calibrage": { w: 450, h: 377, reperes: ["Volant", "Base"], modelSpecific: true, variants: [] }
};
