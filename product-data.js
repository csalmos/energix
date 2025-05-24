// Product data - This would typically come from a database in a real application
window.products = {
    eter: {
        id: 'eter',
        name: 'Éter Karkötő',
        price: 9900,
        description: 'Az Éter karkötőnk a könnyedség és elegancia megtestesítője.',
        fullDescription: `
            <p>Az Éter karkötő különleges kivitelezése a kényelmet és az eleganciát ötvözi. Kiváló minőségű anyagokból készül, hogy hosszú távon is tökéletes megjelenést kölcsönözzön viselőjének.</p>
            <p>Előnyök:</p>
            <ul>
                <li>Könnyű és kényelmes viselet</li>
                <li>Stílusos kivitelezés minden alkalomra</li>
                <li>Kiváló minőségű anyagok</li>
                <li>Könnyű tisztíthatóság</li>
            </ul>
            <p>Tökéletes ajándék szeretteid számára vagy magadnak, ha szeretnéd kiemelni stílusodat.</p>
        `,
        images: [
            'Éter/IMG_0447.JPG',
            'Éter/IMG_0449.JPG',
            'Éter/IMG_0450.JPG'
        ],
        specs: {
            material: 'Rozsdamentes acél, természetes kövek',
            size: 'Állítható méret, kb. 18-22 cm kerület',
            weight: '25 g',
            color: 'Ezüst színű, kék kövekkel'
        }
    },
    onyx: {
        id: 'onyx',
        name: 'Onyx Karkötő',
        price: 11900,
        description: 'Az Onyx karkötő titokzatos eleganciát kölcsönöz megjelenésednek.',
        fullDescription: `
            <p>Az Onyx karkötő titokzatos eleganciát kölcsönöz megjelenésednek. Fekete kövei és elegáns kivitelezése kiemeli egyéniségedet.</p>
            <p>Előnyök:</p>
            <ul>
                <li>Elegáns és letisztult megjelenés</li>
                <li>Minőségi anyagokból készült</li>
                <li>Könnyű tisztíthatóság</li>
                <li>Minden alkalomra alkalmas</li>
            </ul>
            <p>Az Onyx karkötő tökéletes kiegészítője lehet mindennapi viseletednek vagy különleges alkalmakra egyaránt.</p>
        `,
        images: [
            'Onyx/IMG_0455.JPG',
            'Onyx/IMG_0456.JPG',
            'Onyx/IMG_0457.JPG'
        ],
        specs: {
            material: 'Rozsdamentes acél, fekete onyx kövek',
            size: 'Állítható méret, kb. 18-22 cm kerület',
            weight: '28 g',
            color: 'Fekete'
        }
    },
    argentum: {
        id: 'argentum',
        name: 'Argentum Karkötő',
        price: 14900,
        description: 'Az Argentum karkötő egy egyedi és elegáns kivitelezés.',
        fullDescription: `
            <p>Az Argentum karkötő egyedi kivitelezése egyedi stílust kölcsönöz megjelenésednek. Ezüst kövei és elegáns kivitelezése kiemeli egyéniségedet.</p>
            <p>Előnyök:</p>
            <ul>
                <li>Elegáns és letisztult megjelenés</li>
                <li>Minőségi anyagokból készült</li>
                <li>Könnyű tisztíthatóság</li>
                <li>Minden alkalomra alkalmas</li>
            </ul>
            <p>Az Argentum karkötő tökéletes kiegészítője lehet mindennapi viseletednek vagy különleges alkalmakra egyaránt.</p>
        `,
        images: [
            'Argentum/Argentum.JPG',
            'Argentum/IMG_0444.JPG',
        ],
        specs: {
            material: 'Rozsdamentes acél, ezüst kövek',
            size: 'Állítható méret, kb. 18-22 cm kerület',
            weight: '27 g',
            color: 'Ezüst'
        }
    }
};
