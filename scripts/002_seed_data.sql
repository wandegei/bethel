-- Seed data for Bethel Evangelical Church

-- Insert ministries
INSERT INTO public.ministries (name, slug, description, leader_name, meeting_day, meeting_time, is_active) VALUES
('Youth Ministry', 'youth', 'Empowering young people to discover and fulfill their God-given purpose through Bible study, fellowship, and community service.', 'Pastor David Mukasa', 'Saturday', '3:00 PM', TRUE),
('Women''s Fellowship', 'women', 'A supportive community where women grow in faith, build lasting friendships, and develop leadership skills through prayer and study.', 'Mama Grace Namutebi', 'Wednesday', '2:00 PM', TRUE),
('Men''s Fellowship', 'men', 'Building godly men through accountability, discipleship, and service to the church and community.', 'Elder John Ssemakula', 'Saturday', '7:00 AM', TRUE),
('Children''s Ministry', 'children', 'Nurturing young hearts with the love of Jesus through engaging Bible lessons, worship, and activities.', 'Sister Mary Namubiru', 'Sunday', '9:00 AM', TRUE),
('Music & Worship', 'worship', 'Leading the congregation in heartfelt worship through traditional and contemporary music that glorifies God.', 'Minister Paul Kizza', 'Friday', '6:00 PM', TRUE),
('Outreach & Missions', 'missions', 'Sharing the gospel and meeting practical needs in our local community and beyond through evangelism and humanitarian projects.', 'Deacon Samuel Opio', 'Monthly', '10:00 AM', TRUE),
('Prayer Warriors', 'prayer', 'A dedicated team committed to interceding for the church, community, and nations through fervent prayer.', 'Mother Sarah Akello', 'Tuesday', '5:30 AM', TRUE),
('Marriage & Family', 'family', 'Strengthening marriages and families through counseling, workshops, and fellowship events.', 'Pastor & Mrs. Mugisha', 'First Saturday', '10:00 AM', TRUE);

-- Insert upcoming events
INSERT INTO public.events (title, slug, description, location, start_date, end_date, is_featured, ministry_id) VALUES
('Sunday Worship Service', 'sunday-service', 'Join us for a time of praise, worship, and the Word of God. All are welcome!', 'Main Sanctuary', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day' + INTERVAL '2 hours', TRUE, NULL),
('Youth Camp 2026', 'youth-camp-2026', 'An exciting 3-day camp for young people ages 13-25. Theme: "Rise Up & Shine"', 'Lake Victoria Resort, Entebbe', NOW() + INTERVAL '30 days', NOW() + INTERVAL '33 days', TRUE, (SELECT id FROM public.ministries WHERE slug = 'youth')),
('Women''s Prayer Breakfast', 'womens-prayer-breakfast', 'A morning of prayer, worship, and fellowship for all women. Breakfast will be served.', 'Church Fellowship Hall', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days' + INTERVAL '3 hours', FALSE, (SELECT id FROM public.ministries WHERE slug = 'women')),
('Community Outreach Day', 'community-outreach', 'Join us as we serve our neighbors in Kawooko through food distribution, medical checkups, and the gospel.', 'Kawooko Trading Center', NOW() + INTERVAL '14 days', NOW() + INTERVAL '14 days' + INTERVAL '6 hours', TRUE, (SELECT id FROM public.ministries WHERE slug = 'missions')),
('Marriage Enrichment Seminar', 'marriage-seminar', 'A special seminar for married couples focused on building stronger, Christ-centered marriages.', 'Church Conference Room', NOW() + INTERVAL '21 days', NOW() + INTERVAL '21 days' + INTERVAL '4 hours', FALSE, (SELECT id FROM public.ministries WHERE slug = 'family')),
('Night of Worship', 'night-of-worship', 'An evening dedicated to praise and worship. Come encounter the presence of God!', 'Main Sanctuary', NOW() + INTERVAL '10 days', NOW() + INTERVAL '10 days' + INTERVAL '3 hours', TRUE, (SELECT id FROM public.ministries WHERE slug = 'worship'));

-- Insert sermons
INSERT INTO public.sermons (title, slug, description, preacher, series_name, scripture_reference, sermon_date, is_featured, view_count) VALUES
('Walking in Faith', 'walking-in-faith', 'Discover what it means to walk by faith and not by sight in your daily life.', 'Pastor James Mugisha', 'Faith Series', 'Hebrews 11:1-6', CURRENT_DATE - INTERVAL '7 days', TRUE, 245),
('The Power of Prayer', 'power-of-prayer', 'Understanding the transformative power of prayer in the believer''s life.', 'Pastor James Mugisha', 'Prayer & Intercession', 'James 5:13-18', CURRENT_DATE - INTERVAL '14 days', TRUE, 312),
('Love One Another', 'love-one-another', 'Jesus'' commandment to love and how we can practically apply it in our relationships.', 'Pastor David Mukasa', 'Kingdom Living', 'John 13:34-35', CURRENT_DATE - INTERVAL '21 days', FALSE, 189),
('Finding Peace in Troubled Times', 'finding-peace', 'How to experience God''s peace even when circumstances are challenging.', 'Pastor James Mugisha', 'Peace Series', 'Philippians 4:6-7', CURRENT_DATE - INTERVAL '28 days', TRUE, 423),
('The Blessing of Giving', 'blessing-of-giving', 'Understanding God''s principles of generosity and the blessings that follow.', 'Elder John Ssemakula', 'Stewardship', '2 Corinthians 9:6-8', CURRENT_DATE - INTERVAL '35 days', FALSE, 156),
('Purpose and Destiny', 'purpose-and-destiny', 'Discovering God''s unique purpose for your life and how to walk in your destiny.', 'Pastor James Mugisha', 'Identity in Christ', 'Jeremiah 29:11', CURRENT_DATE - INTERVAL '42 days', TRUE, 378);

-- Insert blog posts
INSERT INTO public.blog_posts (title, slug, content, excerpt, author_name, is_published, published_at) VALUES
('Welcome to Our New Website', 'welcome-new-website', 'We are excited to launch our new church website! This platform will help us stay connected as a community and reach more people with the gospel. You can now watch sermons online, register for events, give your tithes and offerings, and stay updated on all church activities. We pray this tool will be a blessing to you and your family.', 'Discover all the features of our new church website designed to keep our community connected.', 'Pastor James Mugisha', TRUE, NOW() - INTERVAL '3 days'),
('The Importance of Community', 'importance-of-community', 'God designed us to live in community. As believers, we are called to bear one another''s burdens, encourage one another, and grow together in faith. At Bethel Evangelical Church, we believe that true spiritual growth happens in the context of relationships. That''s why we encourage everyone to join a ministry, attend fellowship groups, and participate in church activities.', 'Discover why community is essential for spiritual growth and how you can get involved at Bethel.', 'Pastor David Mukasa', TRUE, NOW() - INTERVAL '10 days'),
('Preparing for Easter 2026', 'easter-preparation', 'As we approach the Easter season, let us prepare our hearts to celebrate the resurrection of our Lord Jesus Christ. We have planned special services and activities for the entire family. Join us for Good Friday service, Easter Vigil, and our grand Easter Sunday celebration. Let''s make this season one of reflection, renewal, and rejoicing!', 'Join us for a special Easter season filled with worship, reflection, and celebration.', 'Pastor James Mugisha', TRUE, NOW() - INTERVAL '5 days');
