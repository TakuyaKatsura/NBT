/**
 * 西宮甲山HEROES - NBT公式サイト JavaScript
 * 
 * このファイルは西宮甲山HEROESの公式ウェブサイトで使用される
 * すべてのJavaScript機能を管理します。
 * 
 * 主な機能:
 * - タブ切り替え機能
 * - カテゴリフィルター機能
 * - フォーム送信処理
 * - スムーズスクロール
 * - モバイルメニュー
 * - 画像遅延読み込み
 * - ユーザーインターフェース制御
 */

/**
 * DOMContentLoadedイベントリスナー
 * 
 * HTMLドキュメントの読み込みと解析が完了した時点で実行されます。
 * 画像などの外部リソースの読み込み完了を待たずに実行されるため、
 * ページの応答性を向上させます。
 */
document.addEventListener('DOMContentLoaded', function() {
    // ページ読み込み時に必要なすべてのコンポーネントを初期化
    initializeComponents();
});

/**
 * 全コンポーネントの初期化関数
 * 
 * ウェブサイトで使用されるすべてのJavaScript機能を順次初期化します。
 * この関数により、機能の初期化順序が保証され、依存関係が適切に管理されます。
 */
function initializeComponents() {
    // タブ切り替え機能の初期化（チーム情報、試合結果などのタブ表示）
    initializeTabs();
    
    // カテゴリフィルター機能の初期化（ニュース記事、選手情報のフィルタリング）
    initializeFilters();
    
    // フォーム送信機能の初期化（お問い合わせ、ニュースレター登録）
    initializeForms();
    
    // スムーズスクロール機能の初期化（アンカーリンクのスムーズな移動）
    initializeSmoothScroll();
    
    // モバイルメニュー機能の初期化（レスポンシブデザイン対応）
    initializeMobileMenu();
}

/**
 * タブ切り替え機能の初期化
 * 
 * このメソッドは、ウェブサイト内のタブ機能を有効にします。
 * 主に以下の用途で使用されます：
 * - チーム情報の表示切り替え（選手一覧、コーチングスタッフ、歴史など）
 * - 試合結果の表示切り替え（今シーズン、過去の記録など）
 * - ニュース記事のカテゴリ別表示
 * 
 * HTML構造の要件:
 * - タブボタン: data-tab属性を持つ.tab-btnクラス
 * - タブコンテンツ: 対応するIDを持つ.tab-contentクラス
 */
function initializeTabs() {
    // ページ内のすべてのタブボタンを取得
    const tabBtns = document.querySelectorAll('.tab-btn');
    // ページ内のすべてのタブコンテンツを取得
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 各タブボタンにクリックイベントリスナーを設定
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // クリックされたタブボタンのdata-tab属性値を取得
            // この値が表示するコンテンツのIDと対応している
            const targetTab = this.getAttribute('data-tab');
            
            // タブボタンの状態を更新（アクティブ状態の切り替え）
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // タブコンテンツの表示/非表示を制御
            tabContents.forEach(content => {
                content.classList.remove('active');
                // 対象のタブコンテンツのみをアクティブ状態にする
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
}

/**
 * カテゴリフィルター機能の初期化
 * 
 * このメソッドは、コンテンツをカテゴリ別にフィルタリングする機能を提供します。
 * 主な用途：
 * - ニュース記事のカテゴリ別表示（試合結果、チーム情報、イベント情報など）
 * - 選手情報のポジション別表示（投手、野手など）
 * - 画像ギャラリーの種類別表示（試合写真、練習風景、イベント写真など）
 * 
 * HTML構造の要件：
 * - フィルターボタン: data-category属性を持つ.category-btnクラス
 * - フィルター対象アイテム: data-category属性を持つ要素
 */
function initializeFilters() {
    // ページ内のすべてのカテゴリフィルターボタンを取得
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // 各フィルターボタンにクリックイベントリスナーを設定
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // クリックされたボタンのカテゴリ値を取得
            const category = this.getAttribute('data-category');
            
            // フィルターボタンのアクティブ状態を更新
            // すべてのボタンからactiveクラスを削除し、クリックされたボタンのみアクティブに
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 指定されたカテゴリに基づいてアイテムをフィルタリング
            filterItems(category);
        });
    });
}

/**
 * アイテムフィルタリング実行関数
 * 
 * 指定されたカテゴリに基づいて、ページ内のアイテムの表示/非表示を制御します。
 * フェードイン/フェードアウトアニメーションも含まれています。
 * 
 * @param {string} category - フィルタリングするカテゴリ名（'all'は全て表示）
 */
function filterItems(category) {
    // data-category属性を持つすべての要素を取得
    const items = document.querySelectorAll('[data-category]');
    
    // 各アイテムに対してフィルタリング処理を実行
    items.forEach(item => {
        // 'all'が選択された場合、または一致するカテゴリの場合は表示
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            
            // フェードインアニメーション効果
            // 一旦透明にしてから段階的に表示することで滑らかな表示を実現
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 100);
        } else {
            // 一致しないカテゴリのアイテムは非表示
            item.style.display = 'none';
        }
    });
}

/**
 * フォーム送信機能の初期化
 * 
 * ウェブサイト内のすべてのフォームに対して、送信処理とバリデーション機能を設定します。
 * 主に以下のフォームを対象とします：
 * - お問い合わせフォーム：ファンからの質問、取材申込み、スポンサー問い合わせなど
 * - ニュースレター登録フォーム：試合情報やチームニュースの配信登録
 * - その他の入力フォーム：アンケート、イベント参加申込みなど
 */
function initializeForms() {
    // お問い合わせフォームの処理設定
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // フォーム送信時にhandleContactSubmit関数を実行
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // ニュースレター登録フォームの処理設定
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        // フォーム送信時にhandleNewsletterSubmit関数を実行
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

/**
 * お問い合わせフォーム送信処理
 * 
 * お問い合わせフォームの送信時に実行される処理です。
 * フォームデータの取得、バリデーション、送信処理を順次実行します。
 * 
 * @param {Event} e - フォーム送信イベントオブジェクト
 */
function handleContactSubmit(e) {
    // デフォルトのフォーム送信動作（ページリロード）を防止
    e.preventDefault();
    
    // フォームデータを取得してJavaScriptオブジェクトに変換
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // フォームデータの妥当性を検証
    if (!validateContactForm(data)) {
        // バリデーションに失敗した場合は処理を中止
        return;
    }
    
    // 送信処理の実行
    // 実際の本番環境では、サーバーサイドのエンドポイントにデータを送信
    // 現在はデモンストレーション用の成功メッセージを表示
    showMessage('お問い合わせを受け付けました。3営業日以内にご連絡いたします。', 'success');
    
    // フォームの入力内容をクリア
    e.target.reset();
}

/**
 * ニュースレター登録フォーム送信処理
 * 
 * ニュースレター登録フォームの送信時に実行される処理です。
 * メールアドレスの妥当性を検証し、登録処理を実行します。
 * 
 * @param {Event} e - フォーム送信イベントオブジェクト
 */
function handleNewsletterSubmit(e) {
    // デフォルトのフォーム送信動作を防止
    e.preventDefault();
    
    // 入力されたメールアドレスを取得
    const email = e.target.querySelector('input[type="email"]').value;
    
    // メールアドレスの形式をチェック
    if (!validateEmail(email)) {
        showMessage('有効なメールアドレスを入力してください。', 'error');
        return;
    }
    
    // 登録成功メッセージを表示
    // 実際の実装では、メールアドレスをデータベースやメール配信サービスに登録
    showMessage('ニュースレターの登録が完了しました。', 'success');
    
    // フォームの入力内容をクリア
    e.target.reset();
}

/**
 * お問い合わせフォームバリデーション
 * 
 * お問い合わせフォームの入力内容を検証し、必須項目の入力チェックや
 * データ形式の妥当性を確認します。エラーがある場合は適切なメッセージを表示します。
 * 
 * @param {Object} data - フォームから取得したデータオブジェクト
 * @returns {boolean} バリデーション結果（true: 成功, false: 失敗）
 */
function validateContactForm(data) {
    // お名前の入力チェック
    if (!data.name || data.name.trim() === '') {
        showMessage('お名前を入力してください。', 'error');
        return false;
    }
    
    // メールアドレスの形式チェック
    if (!validateEmail(data.email)) {
        showMessage('有効なメールアドレスを入力してください。', 'error');
        return false;
    }
    
    // 件名の入力チェック
    if (!data.subject || data.subject.trim() === '') {
        showMessage('件名を入力してください。', 'error');
        return false;
    }
    
    // メッセージ本文の入力チェック
    if (!data.message || data.message.trim() === '') {
        showMessage('メッセージを入力してください。', 'error');
        return false;
    }
    
    // プライバシーポリシー同意のチェック
    if (!data.privacy) {
        showMessage('プライバシーポリシーに同意してください。', 'error');
        return false;
    }
    
    // すべての検証が通過した場合
    return true;
}

/**
 * メールアドレス形式バリデーション
 * 
 * 入力されたメールアドレスが適切な形式かどうかを正規表現で検証します。
 * 基本的な形式チェックのみ行い、実在性は確認しません。
 * 
 * @param {string} email - 検証するメールアドレス
 * @returns {boolean} 形式の妥当性（true: 正しい形式, false: 不正な形式）
 */
function validateEmail(email) {
    // メールアドレスの基本的な形式をチェックする正規表現
    // 「文字@文字.文字」の形式を要求
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * ユーザー向けメッセージ表示機能
 * 
 * ユーザーに対してフィードバックメッセージを表示するための汎用機能です。
 * 成功、エラー、警告、情報メッセージに対応し、右上に一時的にポップアップ表示されます。
 * 
 * メッセージタイプ：
 * - success: 成功メッセージ（緑色）- フォーム送信完了など
 * - error: エラーメッセージ（赤色）- バリデーション失敗など
 * - warning: 警告メッセージ（オレンジ色）- 注意喚起など
 * - info: 情報メッセージ（青色）- 一般的な通知
 * 
 * @param {string} message - 表示するメッセージテキスト
 * @param {string} type - メッセージタイプ（success/error/warning/info）
 */
function showMessage(message, type = 'info') {
    // 既存のメッセージポップアップがあれば削除
    // 複数のメッセージが重複して表示されることを防ぐ
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // メッセージ要素の作成
    const messageEl = document.createElement('div');
    messageEl.className = `message-popup message-${type}`;
    messageEl.textContent = message;
    
    // メッセージポップアップの基本スタイルを設定
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
    
    // メッセージタイプに応じて背景色を設定
    switch (type) {
        case 'success':
            // 成功メッセージ：緑色
            messageEl.style.backgroundColor = '#4caf50';
            break;
        case 'error':
            // エラーメッセージ：赤色
            messageEl.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            // 警告メッセージ：オレンジ色
            messageEl.style.backgroundColor = '#ff9800';
            break;
        default:
            // 情報メッセージ：青色（デフォルト）
            messageEl.style.backgroundColor = '#2196f3';
    }
    
    // 作成したメッセージ要素をページに追加
    document.body.appendChild(messageEl);
    
    // スライドインアニメーション
    // 画面外から滑らかに表示される
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動削除タイマー
    // 5秒後にメッセージを自動的に非表示にする
    setTimeout(() => {
        // スライドアウトアニメーション
        messageEl.style.transform = 'translateX(100%)';
        
        // アニメーション完了後に要素を削除
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 300);
    }, 5000);
}

/**
 * スムーズスクロール機能の初期化
 * 
 * ページ内のアンカーリンクをクリックした際に、対象要素まで滑らかにスクロールする機能です。
 * 従来のブラウザのジャンプ動作の代わりに、視覚的に優しいスクロールアニメーションを提供します。
 * 
 * 対象となるリンク：
 * - ナビゲーションメニューの各セクションリンク
 * - 「トップに戻る」ボタン
 * - ページ内の目次リンク
 * - その他の#で始まるhref属性を持つアンカーリンク
 */
function initializeSmoothScroll() {
    // href属性が#で始まるすべてのリンクを取得
    // これらはページ内リンク（アンカーリンク）を示す
    const links = document.querySelectorAll('a[href^="#"]');
    
    // 各アンカーリンクにクリックイベントリスナーを設定
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // クリックされたリンクのhref属性値を取得
            const href = this.getAttribute('href');
            
            // href="#"の場合（空のアンカー）は処理をスキップ
            if (href === '#') return;
            
            // 対象となる要素を検索
            const target = document.querySelector(href);
            
            // 対象要素が存在する場合のみスムーズスクロールを実行
            if (target) {
                // デフォルトのリンク動作（即座のジャンプ）を防止
                e.preventDefault();
                
                // スムーズスクロールを実行
                target.scrollIntoView({
                    behavior: 'smooth',  // スムーズなアニメーション
                    block: 'start'       // 要素の上端を画面上端に合わせる
                });
            }
        });
    });
}

/**
 * モバイルメニュー機能の初期化
 * 
 * レスポンシブデザインの一環として、画面幅が狭いデバイス（スマートフォン、タブレット）向けに
 * ハンバーガーメニュー（三本線アイコン）の切り替え機能を提供します。
 * 
 * 動作仕様：
 * - 画面幅768px以下の場合にモバイルメニューボタンを表示
 * - ボタンクリックでナビゲーションメニューの開閉を切り替え
 * - 画面幅が768pxを超えた場合は自動的に通常のメニュー表示に戻る
 */
function initializeMobileMenu() {
    // ナビゲーション要素とメニュー要素を取得
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    // 初期画面幅チェック：モバイルサイズの場合はメニューボタンを追加
    if (window.innerWidth <= 768) {
        addMobileMenuToggle(nav, navMenu);
    }
    
    // ウィンドウリサイズ時の処理
    // デバイスの向きが変わった場合や、ブラウザウィンドウがリサイズされた場合に対応
    window.addEventListener('resize', function() {
        // デスクトップサイズに戻った場合は、モバイルメニューを閉じる
        if (window.innerWidth > 768) {
            if (navMenu) {
                navMenu.classList.remove('mobile-open');
            }
        }
    });
}

/**
 * モバイルメニュートグルボタンの追加
 * 
 * ハンバーガーメニューボタンを動的に作成し、ナビゲーションに追加します。
 * ボタンクリック時のメニュー開閉機能も含まれています。
 * 
 * @param {Element} nav - ナビゲーション要素
 * @param {Element} navMenu - メニュー要素
 */
function addMobileMenuToggle(nav, navMenu) {
    // 既にモバイルメニューボタンが存在する場合は重複作成を防ぐ
    if (document.querySelector('.mobile-menu-toggle')) {
        return;
    }
    
    // ハンバーガーメニューボタンの作成
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.innerHTML = '☰';  // ハンバーガーアイコン（三本線）
    
    // ボタンの基本スタイルを設定
    toggleBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
    `;
    
    // モバイルサイズでのみボタンを表示
    if (window.innerWidth <= 768) {
        toggleBtn.style.display = 'block';
    }
    
    // ボタンクリック時のメニュー開閉処理
    toggleBtn.addEventListener('click', function() {
        // 'mobile-open'クラスの切り替えによりメニューの表示/非表示を制御
        if (navMenu) {
            navMenu.classList.toggle('mobile-open');
        }
    });
    
    // ナビゲーションにボタンを追加
    if (nav) {
        nav.appendChild(toggleBtn);
    }
    
    // モバイルメニュー用のCSSスタイルを動的に追加
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
    
    // スタイルシートをページのヘッダーに追加
    document.head.appendChild(mobileStyle);
}

/**
 * デバウンス（debounce）ユーティリティ関数
 * 
 * 短時間に連続して発生するイベント（スクロール、リサイズなど）の処理頻度を制限し、
 * パフォーマンスの向上を図るための汎用関数です。
 * 
 * 動作原理：
 * 指定された待機時間内に関数が再び呼び出された場合、前の実行をキャンセルし、
 * 新しいタイマーを設定します。これにより、連続呼び出しの最後の1回のみが実行されます。
 * 
 * @param {Function} func - 実行する関数
 * @param {number} wait - 待機時間（ミリ秒）
 * @returns {Function} デバウンスされた関数
 */
function debounce(func, wait) {
    let timeout;
    
    // 実際に呼び出される関数を返す
    return function executedFunction(...args) {
        // 遅延実行する処理を定義
        const later = () => {
            clearTimeout(timeout);
            func(...args);  // 元の関数を引数と共に実行
        };
        
        // 既存のタイマーをクリア（前の実行をキャンセル）
        clearTimeout(timeout);
        
        // 新しいタイマーを設定
        timeout = setTimeout(later, wait);
    };
}

/**
 * スクロール時のヘッダー視覚効果制御
 * 
 * ページスクロール時にヘッダーの影の濃さを動的に変更し、
 * スクロール位置に応じた視覚的フィードバックを提供します。
 * 
 * 効果：
 * - スクロール位置100px以下：薄い影
 * - スクロール位置100px超過：濃い影（ヘッダーが浮いている印象）
 */
window.addEventListener('scroll', debounce(function() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;  // 現在のスクロール位置を取得
    
    if (header) {
        if (scrolled > 100) {
            // スクロールが進んだ場合：濃い影を適用
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            // ページ上部の場合：薄い影を適用
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
}, 10));  // 10ms間隔でデバウンス処理

/**
 * 画像遅延読み込み（Lazy Loading）機能の初期化
 * 
 * ページ読み込み速度を向上させるため、画面に表示される直前まで画像の読み込みを遅延させる機能です。
 * 特に画像が多いページ（選手紹介、試合写真ギャラリーなど）で効果を発揮します。
 * 
 * 動作仕様：
 * - data-src属性を持つimg要素が対象
 * - 画像が画面に表示される直前に実際の読み込みを開始
 * - IntersectionObserver APIを使用（モダンブラウザ対応）
 * - 古いブラウザには全画像を即座に読み込むフォールバック処理を提供
 * 
 * HTML使用例：
 * <img data-src="actual-image.jpg" class="lazy" alt="選手写真">
 */
function initializeLazyLoading() {
    // data-src属性を持つすべての画像要素を取得
    // これらが遅延読み込み対象の画像
    const images = document.querySelectorAll('img[data-src]');
    
    // IntersectionObserver APIが利用可能かチェック
    if ('IntersectionObserver' in window) {
        // IntersectionObserverを使用した効率的な遅延読み込み
        const imageObserver = new IntersectionObserver((entries) => {
            // 観察対象の各要素について処理
            entries.forEach(entry => {
                // 要素が画面に表示されているかチェック
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // data-src属性の値をsrc属性に設定（実際の画像読み込み開始）
                    img.src = img.dataset.src;
                    
                    // 読み込み中を示すlazyクラスを削除
                    img.classList.remove('lazy');
                    
                    // この画像の監視を終了（一度読み込めば不要）
                    imageObserver.unobserve(img);
                }
            });
        });
        
        // すべての対象画像を監視対象に追加
        images.forEach(img => imageObserver.observe(img));
    } else {
        // フォールバック処理：IntersectionObserverが使用できない古いブラウザ向け
        // すべての画像を即座に読み込む
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * ページ完全読み込み完了後の処理
 * 
 * すべてのリソース（HTML、CSS、JavaScript、画像など）の読み込みが完了した後に実行される処理です。
 * DOMContentLoadedイベントとは異なり、外部リソースの読み込み完了も待ちます。
 */
window.addEventListener('load', function() {
    // 遅延読み込み機能を初期化
    // 全てのリソースが読み込まれた後に実行することで、安定した動作を保証
    initializeLazyLoading();
    
    // ページ読み込み完了時のフェードインアニメーション
    // 読み込み中は透明にしておき、完了時に表示することで滑らかな表示を実現
    document.body.style.opacity = '1';
});

/**
 * グローバルエラーハンドリング
 * 
 * JavaScriptの実行時エラーを捕捉し、適切な処理を行います。
 * 開発時はコンソールにエラーを出力し、本番環境では外部サービスへの送信が可能です。
 */
window.addEventListener('error', function(e) {
    // コンソールにエラー情報を出力（開発時のデバッグ用）
    console.error('JavaScript Error:', e.error);
    
    // 本番環境では、以下のようなエラー監視サービスへの送信を実装
    // 例：Sentry、LogRocket、Google Analytics等
    // if (window.location.hostname !== 'localhost') {
    //     // エラーレポーティングサービスに送信
    // }
});

/**
 * オンライン状態復旧の通知
 * 
 * インターネット接続が復旧した際にユーザーに通知します。
 * ネットワークが不安定な環境でのユーザビリティ向上に寄与します。
 */
window.addEventListener('online', function() {
    showMessage('インターネット接続が復旧しました。', 'success');
});

/**
 * オフライン状態の通知
 * 
 * インターネット接続が切断された際にユーザーに警告します。
 * フォーム送信やデータ取得が失敗する可能性をユーザーに事前に知らせます。
 */
window.addEventListener('offline', function() {
    showMessage('インターネット接続が切断されました。', 'warning');
});