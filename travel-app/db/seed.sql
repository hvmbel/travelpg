DELETE FROM user_favorites;
DELETE FROM user_subscriptions;
DELETE FROM user_cards;
DELETE FROM user_esims;
DELETE FROM banners;
DELETE FROM store_products;
DELETE FROM esim_plans;
DELETE FROM users;

INSERT INTO users (id, name, email, avatar_initials)
VALUES (1, 'Андрей', 'andrey@example.com', 'AN');

INSERT INTO esim_plans (id, country, country_code, region, data_gb, duration_days, price_rub, is_popular) VALUES
(1, 'Турция', 'TR', 'Ближний Восток', 5, 30, 1290, 1),
(2, 'Турция', 'TR', 'Ближний Восток', 10, 30, 2190, 1),
(3, 'Таиланд', 'TH', 'Азия', 5, 15, 1490, 1),
(4, 'Таиланд', 'TH', 'Азия', 10, 30, 2590, 1),
(5, 'Германия', 'DE', 'Европа', 3, 15, 1190, 0),
(6, 'Германия', 'DE', 'Европа', 10, 30, 2990, 1),
(7, 'Италия', 'IT', 'Европа', 5, 15, 1290, 1),
(8, 'Испания', 'ES', 'Европа', 5, 15, 1250, 1),
(9, 'США', 'US', 'Северная Америка', 3, 7, 1790, 1),
(10, 'США', 'US', 'Северная Америка', 10, 30, 3490, 1),
(11, 'Грузия', 'GE', 'СНГ', 5, 30, 990, 0),
(12, 'ОАЭ', 'AE', 'Ближний Восток', 5, 15, 1890, 1),
(13, 'Индонезия', 'ID', 'Азия', 7, 30, 1690, 1),
(14, 'Франция', 'FR', 'Европа', 5, 15, 1390, 0),
(15, 'Япония', 'JP', 'Азия', 5, 15, 2090, 1),
(16, 'Португалия', 'PT', 'Европа', 3, 15, 1090, 0),
(17, 'Чехия', 'CZ', 'Европа', 3, 15, 990, 0);

INSERT INTO user_esims (id, user_id, plan_id, used_gb, activated_at, status)
VALUES (1, 1, 1, 2.1, '2026-03-01', 'active');

INSERT INTO user_cards (id, user_id, last_four, brand, balance_usd, currency)
VALUES (1, 1, '1234', 'VISA', 39.23, 'USD');

INSERT INTO store_products (id, name, category, icon_url, price_usd, description) VALUES
(1, 'ChatGPT Plus', 'ai', '/icons/chatgpt.png', 20.00, 'Доступ к GPT-5 и расширенным функциям'),
(2, 'Netflix', 'subscriptions', '/icons/netflix.png', 12.99, 'Подписка на фильмы и сериалы'),
(3, 'Spotify Premium', 'subscriptions', '/icons/spotify.png', 9.99, 'Музыка без рекламы'),
(4, 'Steam Wallet 20$', 'gaming', '/icons/steam.png', 20.00, 'Пополнение кошелька Steam'),
(5, 'Miro Pro', 'subscriptions', '/icons/miro.png', 10.00, 'Онлайн-доска для команд'),
(6, 'Figma Pro', 'subscriptions', '/icons/figma.png', 12.00, 'Профессиональный дизайн-инструмент'),
(7, 'NordVPN', 'vpn', '/icons/nordvpn.png', 11.99, 'Защищенное соединение за границей'),
(8, 'YouTube Premium', 'subscriptions', '/icons/youtube.png', 10.99, 'Видео без рекламы');

INSERT INTO user_subscriptions (id, user_id, product_id, renewal_date, price_usd)
VALUES (1, 1, 1, '2026-03-17', 20.00);

INSERT INTO user_favorites (id, user_id, product_id, sort_order) VALUES
(1, 1, 1, 1),
(2, 1, 4, 2),
(3, 1, 5, 3),
(4, 1, 6, 4);

INSERT INTO banners (id, title, subtitle, gradient_from, gradient_to, link_to) VALUES
(1, 'До 5% кэшбэк за границей', 'Оплачивайте поездку виртуальной картой', '#0066FF', '#00A3FF', '/card'),
(2, 'eSIM Европа 10 Гб', 'Стабильный интернет в 40+ странах', '#7C3AED', '#4F46E5', '/esim'),
(3, 'Выпусти карту за 2 минуты', 'Добавь в Apple Pay и Google Pay', '#FF9500', '#FF5E3A', '/card');
