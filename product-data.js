// Product data - This would typically come from a database in a real application
window.products = {
    eter: {
        id: 'eter',
        name: 'Éter Karkötő',
        material: '99,99% tiszta réz',
        price: 18550,
        review: '"Más rézkarkötők után ez az első, ami valóban kényelmes és jól is néz ki! Pár nap viselés után éreztem, hogy kevésbé fáradnak el a kezeim, és a mágneses hatás is jótékony. Mellesleg sokan megdicsérték a dizájnt."',
        description: `
            <ul class="product-full-description-list">
                <li><i class="fas fa-check"></i>3500 Gauss mágnesekkel</li>
                <li><i class="fas fa-check"></i>Energiát adó pontok</li>
                <li><i class="fas fa-check"></i>Prémium 99,99%-os vörösréz</li>
                <li><i class="fas fa-check"></i>Stílusos minden alkalomra</li>
                <li><i class="fas fa-check"></i>Könnyű, kényelmes viselet</li>
            </ul>
        `,
        fullDescription: `
            <p>Az Éter karkötő mágneses technológiával és prémium réz alapanyaggal javítja közérzetedet, miközben elegáns stílust kínál.</p>
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
                thumbnail: 'assets/EnergiX/Eter/IMG_0471-400w.webp',
                full: 'assets/EnergiX/Eter/IMG_0471-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Eter/Aether-400w.webp',
                full: 'assets/EnergiX/Eter/Aether-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Eter/IMG_0447-400w.webp',
                full: 'assets/EnergiX/Eter/IMG_0447-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Eter/Eter-tengerpart-hatter-400w.webp',
                full: 'assets/EnergiX/Eter/Eter-tengerpart-hatter-1200w.webp'
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
        price: 17640,
        review: '"Nem hittem el, hogy számít, de mióta hordom, tényleg feltölt, mint egy kávé. A kék szénszálak élőben még szebbek, mint a képeken. Simán megérte kipróbálni!"',
        description: `
            <ul class="product-full-description-list">
                <li><i class="fas fa-check"></i>3500 Gauss mágnesekkel</li>
                <li><i class="fas fa-check"></i>Energiát adó pontok</li>
                <li><i class="fas fa-check"></i>Prémium pehelykönnyű titánium</li>
                <li><i class="fas fa-check"></i>Stílusos minden alkalomra</li>
                <li><i class="fas fa-check"></i>Könnyű, kényelmes viselet</li>
            </ul>
        `,
        fullDescription: `
            <p>Az Éter karkötő mágneses technológiával és prémium réz alapanyaggal javítja közérzetedet, miközben elegáns stílust kínál.</p>
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
                thumbnail: 'assets/EnergiX/Zafir/IMG_0455-400w.webp',
                full: 'assets/EnergiX/Zafir/IMG_0455-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Zafir/IMG_0461_vágott-400w.webp',
                full: 'assets/EnergiX/Zafir/IMG_0461_vágott-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Zafir/IMG_0457-400w.webp',
                full: 'assets/EnergiX/Zafir/IMG_0457-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Zafir/Zafir-belso-kep-400w.webp',
                full: 'assets/EnergiX/Zafir/Zafir-belso-kep-750w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Zafir/Zafir-belso-kep-2-400w.webp',
                full: 'assets/EnergiX/Zafir/Zafir-belso-kep-2-750w.webp'
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
        price: 19180,
        review: '"Nagyon elegáns, pont mint a képeken. Masszív, minőségi acél, diszkrét mágnesekkel. Kicsit nehezebb, mint vártam, de gyorsan megszoktam. Ajándékba kaptam, azóta is szívesen viselem – jó döntés volt!"',
        description: `
            <ul class="product-full-description-list">
                <li><i class="fas fa-check"></i>3500 Gauss mágnesekkel</li>
                <li><i class="fas fa-check"></i>Energiát adó pontok</li>
                <li><i class="fas fa-check"></i>Prémium rozsdamentes acél</li>
                <li><i class="fas fa-check"></i>Stílusos minden alkalomra</li>
                <li><i class="fas fa-check"></i>Könnyű, kényelmes viselet</li>
            </ul>
        `,
        fullDescription: `
            <p>Az Éter karkötő mágneses technológiával és prémium réz alapanyaggal javítja közérzetedet, miközben elegáns stílust kínál.</p>
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
                thumbnail: 'assets/EnergiX/Argentum/Argentum-400w.webp',
                full: 'assets/EnergiX/Argentum/Argentum-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Argentum/IMG_0444-400w.webp',
                full: 'assets/EnergiX/Argentum/IMG_0444-1200w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Argentum/Argentum-belso-kep-400w.webp',
                full: 'assets/EnergiX/Argentum/Argentum-belso-kep-1000w.webp'
            },
            {
                thumbnail: 'assets/EnergiX/Argentum/Argentum-kep-400w.webp',
                full: 'assets/EnergiX/Argentum/Argentum-kep-1000w.webp'
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
    },
    irisz: {
        id: 'irisz',
        name: 'Írisz Réz Mágneses Gyűrű termékcsalád',
        material: 'Rozsdamentes acél',
        review: '"Nagyon elegáns, pont mint a képeken. Masszív, minőségi réz, diszkrét mágnesekkel. Tök jól feldobja a szettemet – jó döntés volt!"',
        description: `
            <ul class="product-full-description-list">
                <li><i class="fas fa-check"></i>3500 Gauss mágnesekkel</li>
                <li><i class="fas fa-check"></i>Energiát adó pontok</li>
                <li><i class="fas fa-check"></i>Prémium rozsdamentes acél</li>
                <li><i class="fas fa-check"></i>Stílusos minden alkalomra</li>
                <li><i class="fas fa-check"></i>Könnyű, kényelmes viselet</li>
            </ul>
        `,
        fullDescription: `
            <p>Az Éter karkötő mágneses technológiával és prémium réz alapanyaggal javítja közérzetedet, miközben elegáns stílust kínál.</p>
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
        specs: {
            material: '99,99% tiszta réz',
            size: 'Állítható méret, 59,5mm-61mm hosszú',
            weight: '14,5 g',
            color: 'Réz színű',
            waterResistance: 'Teljesen vízálló'
        },
        products: {
            irisz: {
                id: 'irisz',
                name: 'Írisz Réz Gyűrű',
                price: 2499,
                material: '99,99% tiszta réz',
                images: [
                    {
                        thumbnail: '/assets/EnergiX/Irisz/Irisz/Irisz-rez-720w.webp',
                        full: '/assets/EnergiX/Irisz/Irisz/Irisz-rez-1200w.webp'
                    }
                ]
            },
            aura: {
                id: 'aura',
                name: 'Aura Réz Gyűrű',
                price: 2499,
                material: '99,99% tiszta réz',
                images: [
                    {
                        thumbnail: '/assets/EnergiX/Irisz/Aura/Aura-720w.webp',
                        full: '/assets/EnergiX/Irisz/Aura/Aura-720w.webp'
                    }
                ]
            }
        }
    }
};
