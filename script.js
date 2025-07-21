// 西宮甲山HEROES - NBT公式サイト JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ページ読み込み時の初期化
    initializeComponents();
});

function initializeComponents() {
    // タブ機能の初期化
    initializeTabs();
    
    // フィルター機能の初期化
    initializeFilters();
    
    // フォーム送信の初期化
    initializeForms();
    
    // スムーズスクロールの初期化
    initializeSmoothScroll();
    
    // モバイルメニューの初期化
    initializeMobileMenu();
}

// タブ機能
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 全てのタブボタンからactiveクラスを削除
            tabBtns.forEach(b => b.classList.remove('active'));
            // クリックされたタブボタンにactiveクラスを追加
            this.classList.add('active');
            
            // 全てのタブコンテンツを非表示
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// カテゴリフィルター機能
function initializeFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // ボタンのアクティブ状態を更新
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // アイテムのフィルタリング
            filterItems(category);
        });
    });
}

function filterItems(category) {
    const items = document.querySelectorAll('[data-category]');
    
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            // アニメーション効果
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 100);
        } else {
            item.style.display = 'none';
        }
    });
}

// フォーム送信機能
function initializeForms() {
    // お問い合わせフォーム
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // ニュースレター登録フォーム
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // フォームデータの取得
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // 簡単なバリデーション
    if (!validateContactForm(data)) {
        return;
    }
    
    // 送信処理（実際の実装では適切なエンドポイントに送信）
    showMessage('お問い合わせを受け付けました。3営業日以内にご連絡いたします。', 'success');
    
    // フォームをリセット
    e.target.reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!validateEmail(email)) {
        showMessage('有効なメールアドレスを入力してください。', 'error');
        return;
    }
    
    showMessage('ニュースレターの登録が完了しました。', 'success');
    e.target.reset();
}

// フォームバリデーション
function validateContactForm(data) {
    if (!data.name || data.name.trim() === '') {
        showMessage('お名前を入力してください。', 'error');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showMessage('有効なメールアドレスを入力してください。', 'error');
        return false;
    }
    
    if (!data.subject || data.subject.trim() === '') {
        showMessage('件名を入力してください。', 'error');
        return false;
    }
    
    if (!data.message || data.message.trim() === '') {
        showMessage('メッセージを入力してください。', 'error');
        return false;
    }
    
    if (!data.privacy) {
        showMessage('プライバシーポリシーに同意してください。', 'error');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// メッセージ表示機能
function showMessage(message, type = 'info') {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // メッセージ要素を作成
    const messageEl = document.createElement('div');
    messageEl.className = `message-popup message-${type}`;
    messageEl.textContent = message;
    
    // スタイルを設定
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // タイプに応じて背景色を設定
    switch (type) {
        case 'success':
            messageEl.style.backgroundColor = '#4caf50';
            break;
        case 'error':
            messageEl.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            messageEl.style.backgroundColor = '#ff9800';
            break;
        default:
            messageEl.style.backgroundColor = '#2196f3';
    }
    
    // ページに追加
    document.body.appendChild(messageEl);
    
    // アニメーション
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動削除
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 300);
    }, 5000);
}

// スムーズスクロール機能
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// モバイルメニュー機能
function initializeMobileMenu() {
    // モバイルメニューボタンの作成（必要に応じて）
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        addMobileMenuToggle(nav, navMenu);
    }
    
    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('mobile-open');
        }
    });
}

function addMobileMenuToggle(nav, navMenu) {
    // モバイルメニューボタンが既に存在する場合は何もしない
    if (document.querySelector('.mobile-menu-toggle')) {
        return;
    }
    
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.innerHTML = '☰';
    toggleBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
    `;
    
    // メディアクエリでボタンの表示を制御
    if (window.innerWidth <= 768) {
        toggleBtn.style.display = 'block';
    }
    
    toggleBtn.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-open');
    });
    
    nav.appendChild(toggleBtn);
    
    // モバイルメニューのスタイルを追加
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block !important;
            }
            
            .nav-menu.mobile-open {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #1e3c72;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }
        }
    `;
    
    document.head.appendChild(mobileStyle);
}

// ユーティリティ関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スクロール時のヘッダー制御
window.addEventListener('scroll', debounce(function() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
}, 10));

// 画像の遅延読み込み
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // フォールバック: IntersectionObserverが使えない場合
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ページ読み込み完了後の処理
window.addEventListener('load', function() {
    initializeLazyLoading();
    
    // 読み込み完了アニメーション
    document.body.style.opacity = '1';
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // 本番環境では適切なエラーレポーティングサービスに送信
});

// オフライン/オンライン状態の管理
window.addEventListener('online', function() {
    showMessage('インターネット接続が復旧しました。', 'success');
});

window.addEventListener('offline', function() {
    showMessage('インターネット接続が切断されました。', 'warning');
});