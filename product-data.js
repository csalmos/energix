// Product data - This would typically come from a database in a real application
console.log('Loading product data...');
window.products = {
    eter: {
        id: 'eter',
        name: 'Éter Karkötő',
        material: '99,99% tiszta réz',
        price: 29500,
        description: 'Az Éter karkötő a természet erejét hozza el csuklódra: réz alapanyagával, mágneses technológiájával, ionokkal, infravörös pontokkal és germániummal hozzájárul egészségedhez, miközben elegáns stílust biztosít.',
        fullDescription: `
            <p>Az Éter karkötő különleges kivitelezése a kényelmet és az eleganciát ötvözi. Kiváló minőségű anyagokból készül, hogy hosszú távon is tökéletes megjelenést kölcsönözzön viselőjének.</p>
            <ul>
                <li>Könnyű és kényelmes viselet</li>
                <li>Stílusos kivitelezés minden alkalomra</li>
                <li>Kiváló minőségű anyagok</li>
                <li>Könnyű tisztíthatóság</li>
            </ul>
            <div class="health-benefits">
                <div class="benefit-item">
                    <i class="fas fa-heart"></i>
                    <span>Csökkenti az ízületi fájdalmat a réz tulajdonságaival.</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-running"></i>
                    <span>Javítja a vérkeringést és csökkenti a fáradtságot.</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-leaf"></i>
                    <span>Csökkenti a stresszt és javítja a hangulatot.</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>Erősíti az immunrendszert és elősegíti a méregtelenítést.</span>
                </div>
                <div class="health-benefits-disclaimer">*Megjegyzés: Az előnyök hagyományos gyakorlatokon alapulnak; konzultálj orvossal orvosi tanácsért.</div>
            </div>
            <p>Tökéletes ajándék szeretteid számára vagy magadnak, ha szeretnéd kiemelni stílusodat.</p>
        `,
        images: [
            {
                thumbnail: 'assets/EnergiX/Éter/Aether-200w.webp',
                full: 'assets/EnergiX/Éter/Aether-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Éter/IMG_0447-200w.webp',
                full: 'assets/EnergiX/Éter/IMG_0447-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Éter/IMG_0471-200w.webp',
                full: 'assets/EnergiX/Éter/IMG_0471-1200w.webp'
            }
        ],
        specs: {
            material: '99,99% tiszta réz',
            size: 'Állítható méret, 22,5 cm hosszú (23 belső szem, 1 csat)',
            weight: '32,5 g',
            color: 'Réz színű',
            waterResistance: 'Igen, de hosszabb vízben tartásra elszíneződhet'
        }
    },
    zafir: {
        id: 'zafir',
        name: 'Zafír Karkötő',
        material: 'Titánium és kék szénszál',
        price: 24500,
        description: 'A Zafír karkötő sportos dizájnnal és karbonrost alapanyaggal kombinálja a modern stílust, miközben mágneses technológiája támogatja a vérkeringést és az energiát, tökéletes választás aktív életmódodhoz.',
        fullDescription: `
            <p>A Zafír karkötő sportos dizájnnal és karbonrost alapanyaggal kombinálja a modern stílust, miközben mágneses technológiája támogatja a vérkeringést és az energiát, tökéletes választás aktív életmódodhoz..</p>
            <p>Előnyök:</p>
            <ul>
                <li>Sportos dizájnnal</li>
                <li>Pehelykönnyű titánból készült</li>
                <li>Könnyű tisztíthatóság</li>
                <li>Minden alkalomra alkalmas</li>
            </ul>
            <div class="health-benefits">
                <div class="benefit-item">
                    <i class="fas fa-heart"></i>
                    <span>Csökkenti az ízületi fájdalmat a mágnes és infravörös pontok tulajdonságaival.</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-running"></i>
                    <span>Javítja a vérkeringést és csökkenti a fáradtságot.</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-leaf"></i>
                    <span>Csökkenti a stresszt és javítja a hangulatot.</span>
                </div>
                <div class="health-benefits-disclaimer">*Megjegyzés: Az előnyök hagyományos gyakorlatokon alapulnak; konzultálj orvossal orvosi tanácsért.</div>
            </div>
            <p>A Zafír karkötő tökéletes kiegészítője lehet mindennapi viseletednek vagy különleges alkalmakra egyaránt.</p>
        `,
        images: [
            {
                thumbnail: 'assets/EnergiX/Zafír/IMG_0455-200w.webp',
                full: 'assets/EnergiX/Zafír/IMG_0455-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Zafír/IMG_0461_vágott-200w.webp',
                full: 'assets/EnergiX/Zafír/IMG_0461_vágott-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Zafír/IMG_0457-200w.webp',
                full: 'assets/EnergiX/Zafír/IMG_0457-800w.webp'
            }
        ],
        specs: {
            material: 'Tiszta Titánium, kék szénszálak',
            size: 'Állítható méret, 22 cm hosszú (8 belső szem, 1 csat)',
            weight: '38 g',
            color: 'Fekete színű, kék szénszállal',
            waterResistance: 'Teljesen vízálló'
        }
    },
    argentum: {
        id: 'argentum',
        name: 'Argentum Karkötő',
        material: 'Rozsdamentes acél',
        price: 27400,
        description: 'Az Argentum karkötő letisztult eleganciát kölcsönöz megjelenésednek.',
        fullDescription: `
            <p>Az Argentum karkötő letisztult eleganciát kölcsönöz megjelenésednek. Ezüst színe és elegáns kivitelezése kiemeli egyéniségedet.</p>
            <p>Előnyök:</p>
            <ul>
                <li>Letisztult és elegáns megjelenés</li>
                <li>Kiváló minőségű anyagok</li>
                <li>Könnyű tisztíthatóság</li>
                <li>Minden stílushoz és alkalomhoz illik</li>
            </ul>
            <div class="health-benefits">
                <div class="benefit-item">
                    <i class="fas fa-heart"></i>
                    <span>Csökkenti az ízületi fájdalmat a réz tulajdonságaival.</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-running"></i>
                    <span>Javítja a vérkeringést és csökkenti a fáradtságot.</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-leaf"></i>
                    <span>Csökkenti a stresszt és javítja a hangulatot.</span>
                </div>
                <div class="health-benefits-disclaimer">*Megjegyzés: Az előnyök hagyományos gyakorlatokon alapulnak; konzultálj orvossal orvosi tanácsért.</div>
            </div>
            <p>Az Argentum karkötő tökéletes választás azoknak, akik egyszerűséget és eleganciát szeretnének egyben.</p>
        `,
        images: [
            {
                thumbnail: 'assets/EnergiX/Argentum/Argentum-200w.webp',
                full: 'assets/EnergiX/Argentum/Argentum-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Argentum/IMG_0444-200w.webp',
                full: 'assets/EnergiX/Argentum/IMG_0444-1200w.webp'
            }
        ],
        specs: {
            material: 'Rozsdamentes acél',
            size: 'Állítható méret, 23 cm hosszú',
            weight: '26 g',
            color: 'Ezüst színű'
        }
    }
};
