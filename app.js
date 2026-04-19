const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'inmath-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

const courses = [
  {
    id: '8plus',
    title: 'Ôn thi THPT Toán 8+',
    tag: 'Kiến thức nền tảng',
    icon: '📈',
    summary: 'Hệ thống hóa kiến thức trọng tâm, bám sát cấu trúc đề thi chính thức của Bộ GD&ĐT.',
    details: 'Khóa học nội dung toàn diện, gồm lý thuyết, bài tập thực hành, và chiến lược giải đề giúp học sinh đạt điểm cao trong kỳ thi THPT.',
    type: 'Hệ thống hóa kiến thức',
    level: 'Tập trung vào nền tảng và kỹ năng giải toán cơ bản đến nâng cao.',
    chapters: [
      { title: 'Chương 1: Nền tảng Đại số', description: 'Hệ phương trình, bất đẳng thức, và khai triển biểu thức.' },
      { title: 'Chương 2: Hình học phẳng', description: 'Tam giác, tứ giác, đường tròn và các định lý hình học cơ bản.' },
      { title: 'Chương 3: Giá trị lượng giác', description: 'Các công thức lượng giác, phương trình và ứng dụng thực hành.' },
      { title: 'Chương 4: Toán thực hành', description: 'Bài tập vận dụng và giải đề thi mẫu với lời giải chi tiết.' }
    ]
  },
  {
    id: '9plus',
    title: 'Ôn thi THPT Toán 9+',
    tag: 'Nâng cao',
    icon: '🚀',
    summary: 'Chinh phục các bài toán vận dụng cao và kỹ thuật giải nhanh lấy điểm 9+.',
    details: 'Khóa học dành cho học sinh mong muốn nâng cao tư duy giải toán, rèn kỹ năng giải nhanh và chuẩn bị tốt cho đề thi THPT.',
    type: 'Rèn luyện kỹ thuật',
    level: 'Tập trung vào bài toán vận dụng cao và chiến lược ôn luyện 9+.',
    chapters: [
      { title: 'Chương 1: Căn bản về số học', description: 'Số nguyên, phân số, và các kỹ thuật tính toán nhanh.' },
      { title: 'Chương 2: Hàm số và đồ thị', description: 'Phân tích hàm số, khảo sát và vẽ đồ thị chính xác.' },
      { title: 'Chương 3: Toán tổ hợp và xác suất', description: 'Giải bài toán tổ hợp, xác suất và bài tập rèn luyện.' },
      { title: 'Chương 4: Luyện đề 9+', description: 'Các đề thi thử 9+ kèm chiến lược giải nhanh và phân tích đáp án.' }
    ]
  },
  {
    id: 'hsa',
    title: 'Toán HSA',
    tag: 'ĐHQG Hà Nội',
    icon: '🧠',
    summary: 'Luyện tư duy định lượng, phân tích số liệu cho kỳ thi Đánh giá năng lực ĐHQG Hà Nội.',
    details: 'Khóa học xây dựng nền tảng tư duy logic, giải toán tổ hợp, xác suất, và số học phù hợp với kỳ thi đánh giá năng lực.',
    type: 'Tư duy định lượng',
    level: 'Phát triển khả năng phân tích và giải quyết đề thi tuyển sinh đại học.',
    chapters: [
      { title: 'Chương 1: Tư duy logic', description: 'Mở rộng kỹ năng suy luận và giải quyết vấn đề bằng phương pháp logic.' },
      { title: 'Chương 2: Phân tích số liệu', description: 'Bài toán thống kê, biểu đồ, và xử lý dữ liệu thực tế.' },
      { title: 'Chương 3: Toán tổ hợp nâng cao', description: 'Các bài toán tổ hợp và đường đi chéo trong kỳ thi năng lực.' },
      { title: 'Chương 4: Luyện đề HSA', description: 'Bộ đề thi mẫu HSA với hướng dẫn chi tiết từng bước giải.' }
    ]
  },
  {
    id: 'tsa',
    title: 'Toán TSA',
    tag: 'ĐH Bách Khoa Hà Nội',
    icon: '🛠️',
    summary: 'Phương pháp giải toán thực tế và tư duy logic cho kỳ thi KTTD ĐH Bách Khoa Hà Nội.',
    details: 'Khóa học trang bị kiến thức toán ứng dụng, logic, và giải bài toán thực tế theo định hướng tuyển sinh ĐH Bách Khoa.',
    type: 'Logic thực tế',
    level: 'Rèn luyện giải đề TSA với phương pháp và kỹ năng giải bài toán định hướng trường đại học.',
    chapters: [
      { title: 'Chương 1: Toán ứng dụng thực tế', description: 'Giải bài toán thực tế về tỉ lệ, lãi suất, và chuyển đổi đơn vị.' },
      { title: 'Chương 2: Logic và suy luận', description: 'Rèn luyện tư duy logic qua các bài toán lập luận và đoán đúng.' },
      { title: 'Chương 3: Hình học không gian cơ bản', description: 'Các dạng toán hình học không gian thường gặp trong đề thi TSA.' },
      { title: 'Chương 4: Luyện đề TSA', description: 'Bài tập mô phỏng đề thi TSA với giải thích từng bước.' }
    ]
  }
];

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Quản trị viên' },
  { id: 2, username: 'student', password: 'user123', role: 'user', name: 'Học sinh' }
];

const findCourse = (id) => courses.find((course) => course.id === id);

const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
};

const ensureAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).render('403', { title: 'Truy cập bị từ chối', user: req.session.user });
};

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Luyện Thi Toán - inMath', courses, user: req.session.user, active: 'home' });
});

app.get('/course/:id', (req, res) => {
  const course = findCourse(req.params.id);
  if (!course) {
    return res.status(404).render('404', { title: 'Không tìm thấy khóa học', user: req.session.user });
  }
  res.render('course', { title: course.title, course, user: req.session.user, active: 'courses' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Đăng nhập', error: null, active: 'login' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((item) => item.username === username && item.password === password);
  if (!user) {
    return res.render('login', { title: 'Đăng nhập', error: 'Tên đăng nhập hoặc mật khẩu không đúng.', active: 'login' });
  }
  req.session.user = { id: user.id, username: user.username, role: user.role, name: user.name };
  res.redirect('/dashboard');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
  const isAdmin = req.session.user.role === 'admin';
  res.render('dashboard', {
    title: isAdmin ? 'Bảng điều khiển quản trị' : 'Trang học viên',
    user: req.session.user,
    courses,
    isAdmin,
    active: 'dashboard'
  });
});

app.get('/admin/courses', ensureAdmin, (req, res) => {
  res.render('admin-courses', { title: 'Quản lý khóa học', user: req.session.user, courses, active: 'dashboard' });
});

app.get('/admin/courses/new', ensureAdmin, (req, res) => {
  res.render('admin-course-form', { title: 'Tạo khóa học mới', user: req.session.user, course: null, action: '/admin/courses', method: 'POST', active: 'dashboard' });
});

const buildChapters = (titles = [], descriptions = []) => {
  const chapterTitles = Array.isArray(titles) ? titles : [titles];
  const chapterDescriptions = Array.isArray(descriptions) ? descriptions : [descriptions];
  return chapterTitles
    .map((title, index) => ({
      title: title ? title.trim() : '',
      description: (chapterDescriptions[index] || '').trim()
    }))
    .filter((chapter) => chapter.title.length > 0);
};

app.post('/admin/courses', ensureAdmin, (req, res) => {
  const { id, title, tag, icon, summary, details, type, level } = req.body;
  const chapters = buildChapters(req.body.chapterTitle, req.body.chapterDescription);
  courses.push({ id, title, tag, icon, summary, details, type, level, chapters });
  res.redirect('/admin/courses');
});

app.get('/admin/courses/:id/edit', ensureAdmin, (req, res) => {
  const course = findCourse(req.params.id);
  if (!course) {
    return res.status(404).render('404', { title: 'Không tìm thấy khóa học', user: req.session.user });
  }
  res.render('admin-course-form', { title: 'Chỉnh sửa khóa học', user: req.session.user, course, action: `/admin/courses/${course.id}/edit`, method: 'POST', active: 'dashboard' });
});

app.post('/admin/courses/:id/edit', ensureAdmin, (req, res) => {
  const course = findCourse(req.params.id);
  if (!course) {
    return res.status(404).render('404', { title: 'Không tìm thấy khóa học', user: req.session.user });
  }
  const { title, tag, icon, summary, details, type, level } = req.body;
  const chapters = buildChapters(req.body.chapterTitle, req.body.chapterDescription);
  Object.assign(course, { title, tag, icon, summary, details, type, level, chapters });
  res.redirect('/admin/courses');
});

app.post('/admin/courses/:id/delete', ensureAdmin, (req, res) => {
  const index = courses.findIndex((item) => item.id === req.params.id);
  if (index !== -1) {
    courses.splice(index, 1);
  }
  res.redirect('/admin/courses');
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Không tìm thấy trang', user: req.session.user });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
