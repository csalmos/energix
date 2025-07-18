// Product data - This would typically come from a database in a real application
window.products = {
    eter: {
        id: 'eter',
        name: 'Éter Karkötő',
        material: '99,99% tiszta réz',
        price: 26500,
        salePrice: 18550,
        taxIncluded: false,
        taxRate: 0.27,
        review: '"Más rézkarkötők után ez az első, ami valóban kényelmes és jól is néz ki! Pár nap viselés után éreztem, hogy kevésbé fáradnak el a kezeim, és a mágneses hatás is jótékony. Mellesleg sokan megdicsérték a dizájnt."',
        description: 'Az Éter karkötő mágneses technológiával és prémium réz alapanyaggal javítja közérzetedet, miközben elegáns stílust kínál.',
        fullDescription: `
            <p>Az Éter karkötő a <strong>kényelmet</strong>, az <strong>eleganciát</strong> és a <strong>természet energetizáló hatását</strong> ötvözi. Prémium minőségű vörösrézből készült, mely <strong>tartós</strong> és <strong>stílusos</strong> viseletet garantál. Ne csak egy karkötőt viselj, hanem egy ékszert, ami a <strong>belső harmóniádat</strong> és <strong>energiaszintedet</strong> is támogatja.</p>
            <ul class="product-full-description-list">
                <li><i class="fas fa-check"></i>Könnyű, kényelmes viselet</li>
                <li><i class="fas fa-check"></i>Stílusos minden alkalomra</li>
                <li><i class="fas fa-check"></i>Kiváló minőségű anyagok</li>
                <li><i class="fas fa-check"></i>Könnyű tisztíthatóság</li>
            </ul>
            <div class="health-benefits">
                <div class="benefit-item">
                    <i class="fas fa-heart"></i>
                    <span>Belső egyensúly támogatása</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-running"></i>
                    <span>Napindító lendület és egész napos energia</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-leaf"></i>
                    <span>Nyugodtabb, kiegyensúlyozottabb hangulat</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>Frissesség és jóllét érzése hagyományos módszerekkel</span>
                </div>
                <div class="health-benefits-disclaimer">*Megjegyzés: Az előnyök hagyományos gyakorlatokon alapulnak; konzultálj orvossal orvosi tanácsért.</div>
            </div>
        `,
        images: [
            {
                thumbnail: '/assets/EnergiX/Eter/IMG_0471-400w.webp',
                full: '/assets/EnergiX/Eter/IMG_0471-1200w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Eter/Aether-400w.webp',
                full: '/assets/EnergiX/Eter/Aether-1200w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Eter/IMG_0447-400w.webp',
                full: '/assets/EnergiX/Eter/IMG_0447-1200w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Eter/Eter-tengerpart-hatter-400w.webp',
                full: '/assets/EnergiX/Eter/Eter-tengerpart-hatter-1200w.webp'
            }
        ],
        specs: {
            material: '99,99% tiszta réz',
            size: 'Állítható méret, 22,5 cm hosszú (23 belső szem, 1 csat)',
            weight: '32,5 g',
            color: 'Réz színű',
            waterResistance: 'Igen, de hosszabb vízben tartásra elszíneződhet'
        },
        reviewWidget: {
            productId: "eter",
            name: "Éter Karkötő",
            url: "https://energixwear.hu/termek/eter",
            imageUrl: "assets/EnergiX/Eter/Aether-200w.webp",
            description: "Kiemel a szürke hétköznapokból"
        }
    },
    zafir: {
        id: 'zafir',
        name: 'Zafír Karkötő',
        material: 'Titánium és kék szénszál',
        price: 25200,
        salePrice: 17640,
        taxIncluded: false,
        review: '"Nem hittem el, hogy számít, de mióta hordom, tényleg feltölt, mint egy kávé. A kék szénszálak élőben még szebbek, mint a képeken. Simán megérte kipróbálni!"',
        description: 'Sportos, modern dizájn karbonrosttal, mágneses technológiával. Energiát és vitalitást adhat, kiváló választás aktív életmódhoz.',
        fullDescription: `
            <p><strong>Sportos, modern dizájn</strong> karbonrosttal és <strong>mágneses pontokkal</strong>. <strong>Infravörös, negatív ion és germánium elemek</strong> támogatják a <strong>frissességet, vitalitást</strong>. Ideális választás aktív életmódhoz.</p>
            <p>Előnyök:</p>
            <ul class="product-full-description-list">
                <li><i class="fas fa-check"></i>Sportos, modern dizájn</li>
                <li><i class="fas fa-check"></i>Pehelykönnyű titánból készült</li>
                <li><i class="fas fa-check"></i>Könnyen tisztán tartható</li>
                <li><i class="fas fa-check"></i>Sokoldalú viselet minden alkalomra</li>
                <li><i class="fas fa-check"></i>Kényelmes, gondosan tervezett illeszkedés</li>
            </ul>
            <div class="health-benefits">
                <div class="benefit-item">
                    <i class="fas fa-heart"></i>
                    <span>A belső egyensúlyod támogatója</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-running"></i>
                    <span>Lendületet ad egész napra</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-leaf"></i>
                    <span>Kiegyensúlyozott hangulat kialakításához</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>Általános frissesség és jóllét</span>
                </div>
                <div class="health-benefits-disclaimer">*Megjegyzés: Az előnyök hagyományos gyakorlatokon alapulnak; konzultálj orvossal orvosi tanácsért.</div>
            </div>
        `,
        images: [
            {
                thumbnail: '/assets/EnergiX/Zafir/IMG_0455-400w.webp',
                full: '/assets/EnergiX/Zafir/IMG_0455-1200w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Zafir/IMG_0461_vágott-400w.webp',
                full: '/assets/EnergiX/Zafir/IMG_0461_vágott-1200w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Zafir/IMG_0457-400w.webp',
                full: '/assets/EnergiX/Zafir/IMG_0457-1200w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Zafir/Zafir-belso-kep-400w.webp',
                full: '/assets/EnergiX/Zafir/Zafir-belso-kep-750w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Zafir/Zafir-belso-kep-2-400w.webp',
                full: '/assets/EnergiX/Zafir/Zafir-belso-kep-2-750w.webp'
            }
        ],
        specs: {
            material: 'Tiszta titánium, kék szénszálak',
            size: 'Állítható méret, 22 cm hosszú (8 belső szem, 1 csat)',
            weight: '38 g',
            color: 'Fekete színű, kék szénszállal',
            waterResistance: 'Teljesen vízálló'
        },
        reviewWidget: {
            productId: "zafir",
            name: "Zafír Karkötő",
            url: "https://energixwear.hu/termek/zafir",
            imageUrl: "assets/EnergiX/Zafir/IMG_0455-200w.webp",
            description: "A sportos, súlytalan útitárs"
        }
    },
    argentum: {
        id: 'argentum',
        name: 'Argentum Karkötő',
        material: 'Rozsdamentes acél',
        price: 27400,
        salePrice: 19180,
        taxIncluded: false,
        review: '"Nagyon elegáns, pont mint a képeken. Masszív, minőségi acél, diszkrét mágnesekkel. Kicsit nehezebb, mint vártam, de gyorsan megszoktam. Ajándékba kaptam, azóta is szívesen viselem – jó döntés volt!"',
        description: 'Az Argentum karkötő letisztult, ezüst elegancia, ami kiemeli egyéniséged.',
        fullDescription: `
            <p>Letisztult rozsdamentes acél elegancia, ami a modern stílust és mindennapi kényelmet ötvözi. A diszkréten beépített mágneses, infravörös, negatív ion és germánium pontok hozzájárulhatnak a vitalitáshoz és a jó közérzethez.</p>
            <p>Előnyök:</p>
            <ul class="product-full-description-list">
                <li><i class="fas fa-check"></i>Letisztult, sokoldalú stílus.</li>
                <li><i class="fas fa-check"></i>Tartós, prémium acél.</li>
                <li><i class="fas fa-check"></i>Egyszerű tisztítás, tartós csillogás.</li>
                <li><i class="fas fa-check"></i>Minden alkalomra tökéletes.</li>
                <li><i class="fas fa-check"></i>Egész napos kényelem.</li>
            </ul>
            <div class="health-benefits">
                <div class="benefit-item">
                    <i class="fas fa-heart"></i>
                    <span>A belső egyensúlyod támogatója</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-running"></i>
                    <span>Lendületet ad egész napra</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-leaf"></i>
                    <span>Kiegyensúlyozott hangulat kialakításához</span>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>Általános frissesség és jóllét</span>
                </div>
                <div class="health-benefits-disclaimer">*Megjegyzés: Az előnyök hagyományos gyakorlatokon alapulnak; konzultálj orvossal orvosi tanácsért.</div>
            </div>
        `,
        images: [
            {
                thumbnail: '/assets/EnergiX/Argentum/Argentum-400w.webp',
                full: '/assets/EnergiX/Argentum/Argentum-1200w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Argentum/IMG_0444-400w.webp',
                full: '/assets/EnergiX/Argentum/IMG_0444-1200w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Argentum/Argentum-belso-kep-400w.webp',
                full: '/assets/EnergiX/Argentum/Argentum-belso-kep-1000w.webp'
            },
            {
                thumbnail: '/assets/EnergiX/Argentum/Argentum-kep-400w.webp',
                full: '/assets/EnergiX/Argentum/Argentum-kep-1000w.webp'
            }
        ],
        specs: {
            material: 'Rozsdamentes acél',
            size: 'Állítható méret, 22,5 cm hosszú (22 belső szem, 1 csat)',
            weight: '64,1 g',
            color: 'Ezüst, króm színű',
            waterResistance: 'Teljesen vízálló'
        },
        reviewWidget: {
            productId: "argentum",
            name: "Argentum Karkötő",
            url: "https://energixwear.hu/termek/argentum",
            imageUrl: "assets/EnergiX/Argentum/Argentum-200w.webp",
            description: "Kézzel készített, állítható mágneses karkötő rézből."
        }
    }
};
