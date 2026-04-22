/* ══════════════════════════════════════
   WEBINARS DATA
══════════════════════════════════════ */
const coursesData = [
    {
        badge: 'Вебинар в записи',
        title: 'Развитие самодосуговой деятельности у детей с РАС',
        author: 'Ярослава Шушина + Елена Марчук',
        desc: 'Вебинар с видеолекцией, 3 рабочими тетрадями, гайдом и разбором вопросов.',
        ceu: '1 CEU Ethics + 1,5 CEU General',
        price: '6 000 ₽',
        buyUrl: 'https://psihogolik.getcourse.ru/dosug'
    },
    {
        badge: 'Вебинар в записи',
        title: 'АВА-терапия онлайн',
        author: 'Нина Веснина и Ярослава Шушина',
        desc: 'Как проводить АВА-занятия онлайн так же результативно, как офлайн — программы, управление вниманием, работа с поведением, реальные кейсы и готовые шаблоны.',
        ceu: '3 CEU General',
        price: '6 000 ₽',
        buyUrl: 'https://psihogolik.getcourse.ru/ABA_therapy_online'
    },
    {
        badge: 'Вебинар в записи',
        title: 'Формирование обусловленностей',
        author: 'Ярослава Шушина',
        desc: 'Как работает обучение через связи между действиями и последствиями — жетоны, таймеры, техника «чистого стола», оперантное и респондентное обусловливание. Видеоразборы из реальных сессий.',
        ceu: '1,5 CEU General',
        price: '4 000 ₽',
        buyUrl: 'https://psihogolik.getcourse.ru/Formation_of_Conditions'
    },
    {
        badge: 'Вебинар в записи',
        title: 'Как развивать «Внимание»?',
        author: 'Ярослава Шушина',
        desc: 'О развитии внимания у детей с РАС — Slap Jack, Кодовое слово, аудиальные и визуальные задания. Пошаговое формирование устойчивого, избирательного и распределённого внимания.',
        ceu: '2 CEU General',
        price: '4 000 ₽',
        buyUrl: 'https://psihogolik.getcourse.ru/Developing_attention'
    }
];

/* ══════════════════════════════════════
   JOKES DATA
══════════════════════════════════════ */
const jokes = [
    '— Папа, почему ты так долго паркуешься?\n— Сынок, это называется «шейпинг». Я подкрепляю каждое приближение к правильному паркингу. 🚗',
    'ABA-терапевт заходит в кофейню. Бариста: «Вам как обычно?» Терапевт: «Только если это не переменный интервал подкрепления…» ☕',
    '— Почему поведенческие аналитики никогда не опаздывают?\n— Потому что знают: непостоянный антецедент — проблема управления средой. 📋',
    'Функциональная оценка семейного ужина:\nАнтецедент — запах еды.\nПоведение — все сидят за столом.\nПоследствие — вкусная еда.\nВывод: еда работает. 🍽️',
    '— Мой ребёнок игнорирует инструкции!\n— Это не проблема ребёнка. Это проблема подкрепления. Вы подкрепляете нежелательное поведение?\n— … да. 😬',
    'Поведенческий аналитик на вечеринке: «Ваш смех — это положительное подкрепление или просто вежливость?» 😂',
    'ABC-анализ понедельника:\nA — начало рабочей недели\nB — сотрудник звонит и говорит что болен\nC — вторник наступил раньше срока 📅'
];

let lastJokeIndex = -1;

/* ══════════════════════════════════════
   RENDER WEBINAR CARD
══════════════════════════════════════ */
function renderCourse(index) {
    const c = coursesData[index];
    const card = document.getElementById('course-card');
    card.innerHTML = `
        <div class="course-badge">${c.badge}</div>
        <h3>${c.title}</h3>
        <p class="course-author">${c.author}</p>
        <p>${c.desc}</p>
        <div class="course-meta">
            <span class="podcast-ceu">${c.ceu}</span>
            <strong class="course-price">${c.price}</strong>
        </div>
        <div class="course-btns">
            <a href="${c.buyUrl}" target="_blank" class="btn-yellow small">Купить доступ</a>
        </div>
    `;
}

/* ══════════════════════════════════════
   COURSE LIST INTERACTION
══════════════════════════════════════ */
function initCourses() {
    renderCourse(0);

    document.querySelectorAll('.course-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.course-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const idx = parseInt(item.dataset.course, 10);
            renderCourse(idx);
        });
    });
}

/* ══════════════════════════════════════
   GENERIC SLIDER
══════════════════════════════════════ */
function initSlider(trackId, prevId, nextId, visibleCount) {
    const track  = document.getElementById(trackId);
    const prev   = document.getElementById(prevId);
    const next   = document.getElementById(nextId);
    if (!track || !prev || !next) return;

    let current = 0;

    function getItemWidth() {
        const item = track.children[0];
        const next = track.children[1];
        if (!item) return 0;
        if (next) {
            return next.getBoundingClientRect().left - item.getBoundingClientRect().left;
        }
        return item.offsetWidth + 20;
    }

    function update() {
        const count  = track.children.length;
        const maxIdx = Math.max(0, count - visibleCount);
        current = Math.min(Math.max(current, 0), maxIdx);
        track.style.transform = `translateX(-${current * getItemWidth()}px)`;
        prev.disabled = current === 0;
        next.disabled = current >= maxIdx;
        prev.style.opacity = current === 0 ? '.4' : '1';
        next.style.opacity = current >= maxIdx ? '.4' : '1';
    }

    prev.addEventListener('click', () => { current--; update(); });
    next.addEventListener('click', () => { current++; update(); });
    update();

    window.addEventListener('resize', update);
}

/* ══════════════════════════════════════
   JOKE BUTTON
══════════════════════════════════════ */
function initJoke() {
    const btn    = document.getElementById('joke-btn');
    const result = document.getElementById('joke-result');
    if (!btn || !result) return;

    btn.addEventListener('click', e => {
        e.preventDefault();
        let idx;
        do { idx = Math.floor(Math.random() * jokes.length); }
        while (idx === lastJokeIndex && jokes.length > 1);
        lastJokeIndex = idx;

        result.classList.remove('visible');
        result.style.display = 'block';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                result.innerHTML = jokes[idx].replace(/\n/g, '<br>');
                result.classList.add('visible');
            });
        });
    });
}

/* ══════════════════════════════════════
   INVITE MODAL
══════════════════════════════════════ */
function initInviteModal() {
    const openBtn  = document.getElementById('invite-btn');
    const modal    = document.getElementById('invite-modal');
    const closeBtn = document.getElementById('invite-close');
    const frame    = document.getElementById('invite-frame');
    if (!openBtn || !modal || !closeBtn) return;

    function showModal() {
        modal.removeAttribute('hidden');
        requestAnimationFrame(() => modal.classList.add('visible'));
        document.body.style.overflow = 'hidden';
        if (frame && frame.src === 'about:blank') {
            const src = frame.dataset.src;
            if (src && src !== 'ВСТАВЬ_ССЫЛКУ_ЯФ_ЗДЕСЬ') frame.src = src;
        }
    }

    function hideModal() {
        modal.classList.remove('visible');
        document.body.style.overflow = '';
        setTimeout(() => modal.setAttribute('hidden', ''), 250);
    }

    openBtn.addEventListener('click', showModal);
    closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', e => { if (e.target === modal) hideModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });
}

/* ══════════════════════════════════════
   BLOG SHOW MORE
══════════════════════════════════════ */
function initBlogMore() {
    const btn = document.getElementById('blog-more-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        document.querySelectorAll('.yt-card.yt-hidden').forEach(c => c.classList.remove('yt-hidden'));
        btn.parentElement.remove();
    });
}

/* ══════════════════════════════════════
   GETCOURSE OVERLAY
══════════════════════════════════════ */
function initGcOverlay() {
    const overlay    = document.getElementById('gc-overlay');
    const continueBtn = document.getElementById('gc-continue');
    const cancelBtn   = document.getElementById('gc-cancel');
    if (!overlay || !continueBtn || !cancelBtn) return;

    let pendingUrl = '';

    function showOverlay(url) {
        pendingUrl = url;
        overlay.removeAttribute('hidden');
        requestAnimationFrame(() => overlay.classList.add('visible'));
        document.body.style.overflow = 'hidden';
    }

    function hideOverlay() {
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
        setTimeout(() => overlay.setAttribute('hidden', ''), 250);
    }

    document.addEventListener('click', e => {
        const link = e.target.closest('a[href*="getcourse.ru"]');
        if (!link) return;
        e.preventDefault();
        showOverlay(link.href);
    });

    continueBtn.addEventListener('click', () => {
        window.open(pendingUrl, '_blank', 'noopener,noreferrer');
        hideOverlay();
    });

    cancelBtn.addEventListener('click', hideOverlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) hideOverlay(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hideOverlay(); });
}

/* ══════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════ */
function initNav() {
    const burger = document.getElementById('burger');
    const links  = document.getElementById('nav-links');
    if (!burger || !links) return;

    function closeNav() {
        burger.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', e => {
        e.stopPropagation();
        burger.classList.toggle('open');
        links.classList.toggle('open');
        document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', closeNav);
    });

    document.addEventListener('click', e => {
        if (links.classList.contains('open') && !links.contains(e.target) && !burger.contains(e.target)) {
            closeNav();
        }
    });
}

/* ══════════════════════════════════════
   STICKY HEADER SHADOW
══════════════════════════════════════ */
function initScrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
}

/* ══════════════════════════════════════
   FADE-IN ON SCROLL
══════════════════════════════════════ */
function initScrollFade() {
    const targets = document.querySelectorAll(
        '.material-card, .review-card, .podcast-card, .course-item, .video-card, .webinar-card, .yt-card'
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity    = '1';
                e.target.style.transform  = 'translateY(0)';
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity .5s ease ${i * 60}ms, transform .5s ease ${i * 60}ms`;
        observer.observe(el);
    });
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
/* ══════════════════════════════════════
   COOKIE BANNER
══════════════════════════════════════ */
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const btn    = document.getElementById('cookie-accept');
    if (!banner || !btn) return;

    if (localStorage.getItem('cookieAccepted')) {
        banner.style.display = 'none';
        return;
    }

    btn.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', '1');
        banner.classList.add('hidden');
        setTimeout(() => banner.style.display = 'none', 350);
    });
}

/* ══════════════════════════════════════
   CONTACTS FORM
══════════════════════════════════════ */
function initContactsForm() {
    const frame = document.getElementById('contacts-form-frame');
    const placeholder = document.getElementById('contacts-form-placeholder');
    if (!frame) return;
    const src = frame.dataset.src;
    if (src) {
        frame.src = src;
        frame.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCourses();
    initSlider('rev-track', 'rev-prev', 'rev-next', 3);
    initJoke();
    initNav();
    initScrollHeader();
    initScrollFade();
    initInviteModal();
    initBlogMore();
    initGcOverlay();
    initCookieBanner();
    initContactsForm();
});
