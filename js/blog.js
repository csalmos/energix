// Blog content data
const blogPosts = {
    'energialanc': {
        title: 'Hogyan segíthet az energialánc egyensúlyba hozni a szervezetedet?',
        content: `
            <p>Az energialáncok egyre népszerűbb kiegészítővé váltak az egészségtudatos emberek körében. De vajon hogyan is működnek ezek a különleges karkötők?</p>
            <h3>Az energialáncok hatásmechanizmusa</h3>
            <p>Az energialáncok különböző természetes ásványokat és fémeket tartalmaznak, amelyek együttes hatása segíthet a szervezet energiaegyensúlyának helyreállításában. A leggyakrabban használt anyagok közé tartozik a réz, a germánium, valamint különböző ásványi anyagok.</p>
            <h3>Előnyök és hatások</h3>
            <p>Az energialáncok használata számos előnnyel járhat, köztük:</p>
            <ul>
                <li>Fokozott energia és életerő</li>
                <li>Javult közérzet</li>
                <li>Csökkent stressz és feszültség</li>
                <li>Javult alvásminőség</li>
            </ul>
            <p>Fontos azonban megjegyezni, hogy ezek a termékek nem helyettesítik az orvosi kezelést, és eredményeik egyénenként eltérőek lehetnek.</p>
        `
    },
    'egeszseges': {
        title: '5 egyszerű tipp az egészséges életmódhoz',
        content: `
            <p>Az egészséges életmód nemcsak a testsúlyunkat, hanem teljes egészségünket is jelentősen befolyásolhatja. Íme öt egyszerű tipp, amivel könnyedén javíthatod életminőségedet:</p>
            <h3>1. Egészséges táplálkozás</h3>
            <p>Próbálj minél több friss zöldséget és gyümölcsöt fogyasztani. A színes táplálkozás biztosítja, hogy minden szükséges tápanyagot megkapj a szervezeted számára.</p>
            <h3>2. Rendszeres mozgás</h3>
            <p>Naponta legalább 30 perc közepes intenzitású testmozgás segíthet fenntartani az egészségedet. Nem kell edzőterembe járnod, egy séta a friss levegőn is csodákra képes!</p>
            <h3>3. Megfelelő hidratáltság</h3>
            <p>Naponta legalább 2-3 liter folyadék fogyasztása elengedhetetlen a szervezet megfelelő működéséhez. A víz mellett a friss gyümölcslevek és a gyógynövényekből készült teák is kitűnő választások.</p>
        `
    },
    'termekajanlo': {
        title: 'Melyik karkötő illik hozzád a legjobban?',
        content: `
            <p>Válaszd ki a számodra legmegfelelőbb karkötőt az alábbi útmutatás segítségével!</p>
            <h3>1. Stílus és megjelenés</h3>
            <p>Először fontold meg, milyen stílust szeretnél. Az egyszerű és letisztult vonalakat kedvelőknek az Argentum karkötő lehet a megfelelő, míg a természetes hatású kiegészítőket kedvelők az Éter karkötőt találhatják vonzónak.</p>
            <h3>2. Anyag és kényelem</h3>
            <p>Fontos szempont lehet az anyag is. A réz karkötők például idővel természetes patinát kapnak, ami egyedivé teszi azokat. Az acél változatok viszont hosszabb ideig tartanak meg eredeti színüket.</p>
            <h3>3. Méret és méretezés</h3>
            <p>Nézd meg a csuklód kerületét, és válaszd ki a megfelelő méretet. A legtöbb karkötőnk állítható, így biztosan kényelmesen fogod hordani.</p>
            <p>Ha bizonytalan vagy, kérj szakértői segítséget ügyfélszolgálatunktól, aki segít a legjobb választásban!</p>
        `
    }
};

// Initialize blog modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'blogModal';
    modal.className = 'blog-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'blog-modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-blog-modal';
    closeBtn.innerHTML = '&times;';
    
    const modalBody = document.createElement('div');
    modalBody.className = 'blog-modal-body';
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        /* Blog Modal */
        .blog-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .blog-modal.show {
            display: block;
            opacity: 1;
        }

        .blog-modal-content {
            background-color: #fff;
            margin: 5% auto;
            padding: 30px;
            border-radius: 8px;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }

        .blog-modal.show .blog-modal-content {
            transform: translateY(0);
        }

        .close-blog-modal {
            position: absolute;
            right: 20px;
            top: 15px;
            font-size: 28px;
            font-weight: bold;
            color: #666;
            cursor: pointer;
            transition: color 0.3s ease;
        }

        .close-blog-modal:hover {
            color: #333;
        }

        .blog-modal-body {
            padding: 20px 0;
        }

        .blog-modal-body h2 {
            margin-bottom: 20px;
            color: #333;
        }

        .blog-modal-body h3 {
            margin: 25px 0 15px;
            color: #444;
        }

        .blog-modal-body p {
            margin-bottom: 15px;
            line-height: 1.6;
            color: #555;
        }

        .blog-modal-body ul {
            margin-bottom: 20px;
            padding-left: 20px;
        }

        .blog-modal-body li {
            margin-bottom: 8px;
            line-height: 1.5;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .blog-modal-content::-webkit-scrollbar {
            width: 8px;
        }
        
        .blog-modal-content::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
        }
        
        .blog-modal-content::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
        }
        
        .blog-modal-content::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    `;
    document.head.appendChild(style);
    
    // Set data-blog attributes to read-more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    if (readMoreLinks.length === 3) {
        readMoreLinks[0].setAttribute('data-blog', 'energialanc');
        readMoreLinks[1].setAttribute('data-blog', 'egeszseges');
        readMoreLinks[2].setAttribute('data-blog', 'termekajanlo');
    }
    
    // Open modal when clicking on read more links
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogId = this.getAttribute('data-blog');
            const blog = blogPosts[blogId];
            
            if (blog) {
                modalBody.innerHTML = `
                    <h2>${blog.title}</h2>
                    <div class="blog-post-content">
                        ${blog.content}
                    </div>
                `;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
});
