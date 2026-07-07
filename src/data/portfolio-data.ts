export interface BlogPost {
  id: string
  title: string
  titleEn: string
  date: string
  summary: string
  image: string
  tags: string[]
  content: string
  hasMath: boolean
  hasCode: boolean
}

export interface Project {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionFull: string
  image: string
  technologies: string[]
  keyTechnologies: string[]
  githubUrl?: string
  demoUrl?: string
  gallery: string[]
}

export interface ResumeData {
  name: string
  nameEn: string
  title: string
  titleEn: string
  bio: string
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  softSkills: string[]
  interests: string[]
  languages: string[]
}

export interface Education {
  degree: string
  field: string
  institution: string
  period: string
  gpa?: string
  description?: string
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
}

export interface Skill {
  name: string
  level: number
  category: string
  icon?: string
}

export const resumeData: ResumeData = {
  name: 'مهدی احمدی',
  nameEn: 'Mehdi Ahmadi',
  title: 'دانشجوی مهندسی مکانیک',
  titleEn: 'Mechanical Engineering Student',
  bio: 'دانشجوی کارشناسی مهندسی مکانیک با علاقه‌ی عمیق به هوش مصنوعی، یادگیری ماشین و فناوری دیجیتال توئین. تلاش برای ترکیب دانش مهندسی سنتی با فناوری‌های نوین به‌منظور حل مسائل پیچیده صنعتی.',
  education: [
    {
      degree: 'کارشناسی',
      field: 'مهندسی مکانیک',
      institution: 'دانشگاه صنعتی شریف',
      period: '۱۴۰۰ - اکنون',
      gpa: '۱۷.۸۵',
      description: 'تمرکز بر ترمودینامیک، مکانیک سیالات و طراحی سیستم‌های مکانیکی. فعالیت پژوهشی در زمینه بهینه‌سازی با یادگیری ماشین.',
    },
    {
      degree: 'دیپلم',
      field: 'ریاضی و فیزیک',
      institution: 'دبیرستان حکمت',
      period: '۱۳۹۷ - ۱۴۰۰',
      gpa: '۱۹.۴۲',
    },
  ],
  experience: [
    {
      title: ' دستیار پژوهشی - آزمایشگاه دیجیتال توئین',
      company: 'دانشگاه صنعتی شریف',
      period: 'تابستان ۱۴۰۳',
      description: 'توسعه مدل دیجیتال توئین توربین گازی با استفاده از سنسورهای IoT و الگوریتم‌های یادگیری ماشین. کاهش خطای پیش‌بینی به ۱۲٪.',
    },
    {
      title: 'کارآموز مهندسی مکانیک',
      company: 'شرکت فولاد خوزستان',
      period: 'تابستان ۱۴۰۲',
      description: 'مشارکت در پروژه بهینه‌سازی مصرف انرژی کوره ذوب. تحلیل داده‌های عملکردی و ارائه گزارش بهبود فرآیند.',
    },
  ],
  skills: [
    { name: 'Python', level: 90, category: 'برنامه‌نویسی', icon: 'Code' },
    { name: 'TensorFlow / PyTorch', level: 80, category: 'یادگیری ماشین', icon: 'Brain' },
    { name: 'MATLAB', level: 85, category: 'مهندسی', icon: 'Calculator' },
    { name: 'SolidWorks', level: 88, category: 'CAD', icon: 'Box' },
    { name: 'ANSYS', level: 75, category: 'شبیه‌سازی', icon: 'Cpu' },
    { name: 'React / Next.js', level: 72, category: 'توسعه وب', icon: 'Globe' },
    { name: 'SQL / NoSQL', level: 68, category: 'داده', icon: 'Database' },
    { name: 'Docker / Git', level: 78, category: 'DevOps', icon: 'Container' },
  ],
  softSkills: ['حل مسئله', 'کار تیمی', 'ارائه علمی', 'مدیریت زمان', 'یادگیری مستمر'],
  interests: ['دیجیتال توئین', 'یادگیری ماشین', 'اینترنت اشیا', 'رباتیک', 'تحلیل داده'],
  languages: ['فارسی (زبان مادری)', 'انگلیسی (IELTS 7.0)'],
}

export const blogPosts: BlogPost[] = [
  {
    id: 'digital-twin-turbine',
    title: 'ساخت دیجیتال توئین توربین گازی با یادگیری ماشین',
    titleEn: 'Building a Gas Turbine Digital Twin with ML',
    date: '۱۵ آذر ۱۴۰۳',
    summary: 'در این پست، فرآیند ساخت یک مدل دیجیتال توئین برای توربین گازی صنعتی را مرور می‌کنیم. از جمع‌آوری داده‌های سنسور تا آموزش مدل پیش‌بینی‌کننده با شبکه‌های عصبی LSTM.',
    image: '',
    tags: ['دیجیتال توئین', 'یادگیری ماشین', 'IoT'],
    content: `# ساخت دیجیتال توئین توربین گازی با یادگیری ماشین

## مقدمه
دیجیتال توئین (Digital Twin) یکی از فناوری‌های کلیدی انقلاب صنعتی چهارم است. این فناوری به ما اجازه می‌دهد یک نسخه مجازی از سیستم فیزیکی بسازیم و رفتار آن را در زمان واقعی پیش‌بینی کنیم.

## معماری سیستم
معماری ما شامل سه لایه اصلی است:
1. **لایه داده**: جمع‌آوری داده از سنسورهای دما، فشار و ارتعاش
2. **لایه پردازش**: پیش‌پردازش داده و استخراج ویژگی
3. **لایه مدل**: شبکه عصبی LSTM برای پیش‌بینی

## مدل ریاضی
رابطه پایه ترمودینامیکی برای کار توربین:

$$W = \\dot{m} \\cdot c_p \\cdot (T_{in} - T_{out})$$

که در آن $\\dot{m}$ نرخ جرمی جریان گاز، $c_p$ گرمای ویژه در فشار ثابت و $T_{in}$ و $T_{out}$ دمای ورودی و خروجی هستند.

## نتایج
مدل ما توانست با دقت **۹۵.۳٪** رفتار توربین را در بازه زمانی ۶ ماهه پیش‌بینی کند.

## کد نمونه
\`\`\`python
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

model = Sequential([
    LSTM(128, return_sequences=True, input_shape=(timesteps, features)),
    Dropout(0.2),
    LSTM(64, return_sequences=False),
    Dropout(0.2),
    Dense(32, activation='relu'),
    Dense(1, activation='linear')
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])
model.fit(X_train, y_train, epochs=100, batch_size=32)
\`\`\`

## نتیجه‌گیری
ترکیب یادگیری ماشین با دانش مهندسی سنتی می‌تواند به پیش‌بینی دقیق‌تری از رفتار سیستم‌های صنعتی منجر شود.`,
    hasMath: true,
    hasCode: true,
  },
  {
    id: 'ai-predictive-maintenance',
    title: 'هوش مصنوعی در نگهداری پیش‌بینانه تجهیزات صنعتی',
    titleEn: 'AI in Predictive Maintenance of Industrial Equipment',
    date: '۲ آبان ۱۴۰۳',
    summary: 'بررسی کاربرد الگوریتم‌های یادگیری ماشین در پیش‌بینی خرابی تجهیزات صنعتی قبل از وقوع. کاهش هزینه‌های نگهداری تا ۴۰٪ با استفاده از تحلیل ارتعاشات.',
    image: '',
    tags: ['هوش مصنوعی', 'نگهداری پیش‌بینانه', 'تحلیل داده'],
    content: `# هوش مصنوعی در نگهداری پیش‌بینانه

## چرا نگهداری پیش‌بینانه؟
نگهداری پیش‌بینانه (Predictive Maintenance) به‌جای تعمیرات برنامه‌ریزی‌شده یا واکنشی، با استفاده از داده‌های واقعی زمان تعمیر را پیش‌بینی می‌کند.

## متدولوژی
1. جمع‌آوری داده از سنسورهای ارتعاش
2. استخراج ویژگی‌های فرکانسی با FFT
3. طبقه‌بندی با Random Forest و XGBoost

## معادله تبدیل فوریه سریع
$$X(k) = \\sum_{n=0}^{N-1} x(n) \\cdot e^{-i 2\\pi k n / N}$$

\`\`\`python
import numpy as np
from scipy.fft import fft

def extract_features(vibration_signal, fs):
    n = len(vibration_signal)
    fft_result = fft(vibration_signal)
    freqs = np.fft.fftfreq(n, 1/fs)
    magnitudes = np.abs(fft_result[:n//2])
    return freqs[:n//2], magnitudes
\`\`\`

## نتایج
- دقت تشخیص خرابی: **۹۲.۷٪**
- کاهش هزینه‌های نگهداری: **۴۰٪**
- کاهش توقف غیربرنامه‌ریزی: **۵۵٪**`,
    hasMath: true,
    hasCode: true,
  },
  {
    id: 'python-automation-mechanical',
    title: 'اتوماسیون فرآیندهای مهندسی مکانیک با پایتون',
    titleEn: 'Automating Mechanical Engineering Processes with Python',
    date: '۱۰ مهر ۱۴۰۳',
    summary: 'چگونه پایتون می‌تواند فرآیندهای تکراری مهندسی مکانیک مانند تحلیل تنش، طراحی پارامتریک و تولید گزارش را اتوماتیک کند.',
    image: '',
    tags: ['پایتون', 'اتوماسیون', 'مهندسی مکانیک'],
    content: `# اتوماسیون فرآیندهای مهندسی مکانیک با پایتون

## مقدمه
پایتون به‌عنوان یکی از قدرتمندترین زبان‌های اسکریپت‌نویسی، می‌تواند بسیاری از فرآیندهای تکراری در مهندسی مکانیک را اتوماتیک کند.

## کاربردها
- طراحی پارامتریک قطعات
- تحلیل تنش و تغییر شکل
- تولید خودکار گزارش‌های فنی
- پردازش داده‌های آزمایشگاهی

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import minimize

def stress_optimization(params):
    """بهینه‌سازی تنش با الگوریتم ژنتیک"""
    # تحلیل المان محدود ساده‌شده
    stress = compute_stress(params)
    return stress

result = minimize(stress_optimization, x0=initial_guess, method='SLSQP')
\`\`\`

## مزایا
- کاهش زمان طراحی تا **۶۰٪**
- حذف خطاهای انسانی
- امکان بهینه‌سازی خودکار`,
    hasMath: false,
    hasCode: true,
  },
  {
    id: 'iot-smart-factory',
    title: 'اینترنت اشیا در کارخانه‌های هوشمند',
    titleEn: 'IoT in Smart Factories',
    date: '۵ شهریور ۱۴۰۳',
    summary: 'نقش اینترنت اشیا (IoT) در تبدیل کارخانه‌های سنتی به محیط‌های هوشمند. از حسگرها تا تحلیل داده‌های بزرگ.',
    image: '',
    tags: ['IoT', 'صنعت ۴.۰', 'هوش مصنوعی'],
    content: `# اینترنت اشیا در کارخانه‌های هوشمند

## کارخانه هوشمند چیست؟
کارخانه هوشمند محیطی است که تجهیزات فیزیکی با سیستم‌های دیجیتال یکپارچه شده‌اند.

## معماری IoT صنعتی

$$E_{total} = \\sum_{i=1}^{n} P_i \\cdot t_i \\cdot \\eta_i$$

## پلتفرم‌های کلیدی
- Siemens MindSphere
- PTC ThingWorx
- AWS IoT Core

\`\`\`python
# نمونه کد خواندن سنسور دما
import paho.mqtt.client as mqtt

def on_message(client, userdata, msg):
    temperature = float(msg.payload.decode())
    if temperature > THRESHOLD:
        send_alert(temperature)

client = mqtt.Client()
client.on_message = on_message
client.connect("broker.hivemq.com", 1883)
client.subscribe("factory/sensor/temperature")
client.loop_start()
\`\`\``,
    hasMath: true,
    hasCode: true,
  },
]

export const projects: Project[] = [
  {
    id: 'digital-twin-platform',
    title: 'پلتفرم دیجیتال توئین توربین گازی',
    titleEn: 'Gas Turbine Digital Twin Platform',
    description: 'ساخت یک پلتفرم کامل دیجیتال توئین برای مانیتورینگ و پیش‌بینی رفتار توربین گازی صنعتی با استفاده از یادگیری ماشین و IoT.',
    descriptionFull: `این پروژه شامل طراحی و پیاده‌سازی یک پلتفرم جامع دیجیتال توئین برای توربین گازی صنعتی است. پلتفرم با دریافت داده‌های واقعی از سنسورهای دما، فشار، ارتعاش و سرعت چرخش، یک مدل مجازی از توربین می‌سازد و رفتار آینده آن را پیش‌بینی می‌کند.

## ویژگی‌های کلیدی
- مانیتورینگ لحظه‌ای (Real-time Monitoring) با داشبورد تعاملی
- پیش‌بینی خرابی با دقت ۹۵٪
- بهینه‌سازی پارامترهای عملیاتی
- هشدارهای هوشمند بر اساس الگوهای ناهنجاری

## فناوری‌ها
- بک‌اند: Python, FastAPI, TensorFlow
- فرانت‌اند: React, D3.js, WebSocket
- دیتابیس: TimescaleDB, Redis
- IoT: MQTT, ESP32 sensors

## دستاوردها
- کاهش زمان توقف unplanned به ۶۰٪
- بهبود راندمان سوخت ۸٪
- ارائه در کنفرانس ملی مهندسی مکانیک`,
    image: '',
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js', 'FastAPI', 'MQTT', 'TimescaleDB', 'Docker'],
    keyTechnologies: ['TensorFlow', 'MQTT', 'D3.js'],
    githubUrl: 'https://github.com',
    gallery: [],
  },
  {
    id: 'predictive-maintenance-ml',
    title: 'سیستم نگهداری پیش‌بینانه با ML',
    titleEn: 'ML-Based Predictive Maintenance System',
    description: 'توسعه سیستم نگهداری پیش‌بینانه با استفاده از تحلیل ارتعاشات و الگوریتم‌های یادگیری ماشین برای تجهیزات چرخان صنعتی.',
    descriptionFull: `سیستم نگهداری پیش‌بینانه مبتنی بر یادگیری ماشین که با تحلیل سیگنال‌های ارتعاشی تجهیزات چرخان، خرابی‌های احتمالی را پیش از وقوع تشخیص می‌دهد.

## روش‌شناسی
1. جمع‌آوری داده از شتاب‌سنج‌های صنعتی
2. پیش‌پردازش با فیلتر باتروورس و تبدیل فوریه
3. استخراج ویژگی‌های آماری و فرکانسی
4. آموزش مدل‌های XGBoost و شبکه‌های عصبی

## نتایج
- دقت تشخیص: ۹۲.۷٪
- False Positive Rate: ۳.۲٪
- پیش‌بینی ۷۲ ساعت قبل از خرابی`,
    image: '',
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'NumPy', 'SciPy', 'Pandas', 'Matplotlib'],
    keyTechnologies: ['XGBoost', 'Scikit-learn'],
    githubUrl: 'https://github.com',
    gallery: [],
  },
  {
    id: 'cad-automation-tool',
    title: 'ابزار اتوماسیون طراحی CAD',
    titleEn: 'CAD Design Automation Tool',
    description: 'اسکریپت‌های پایتون برای اتوماسیون طراحی پارامتریک در SolidWorks و تولید خودکار نقشه‌های فنی.',
    descriptionFull: `مجموعه‌ای از اسکریپت‌های پایتون برای اتوماسیون فرآیند طراحی پارامتریک قطعات مکانیکی در نرم‌افزار SolidWorks.

## قابلیت‌ها
- طراحی پارامتریک شفت‌ها و یاتاقان‌ها
- تولید خودکار نقشه‌های دو بعدی
- خروجی فایل‌های استاندارد (STEP, IGES, DWG)
- گزارش تحلیل تنش خودکار با ANSYS

## ابزارها
- Python + pywin32 برای ارتباط با SolidWorks API
- Matplotlib برای نمودارهای تحلیلی
- ReportLab برای تولید PDF`,
    image: '',
    technologies: ['Python', 'SolidWorks API', 'pywin32', 'ANSYS', 'ReportLab'],
    keyTechnologies: ['SolidWorks API', 'ANSYS'],
    githubUrl: 'https://github.com',
    gallery: [],
  },
  {
    id: 'smart-home-energy',
    title: 'بهینه‌سازی مصرف انرژی ساختمان هوشمند',
    titleEn: 'Smart Building Energy Optimization',
    description: 'پروژه اینترنت اشیا برای بهینه‌سازی مصرف انرژی ساختمان‌های مسکونی با استفاده از سنسورها و الگوریتم‌های بهینه‌سازی.',
    descriptionFull: `پروژه بهینه‌سازی مصرف انرژی با استفاده از شبکه سنسورهای IoT و الگوریتم‌های یادگیری تقویتی.

## معماری
- سنسورهای دما و رطوبت (DHT22)
- سنسورهای حرکتی (PIR)
- کنترلر مرکزی (Raspberry Pi)
- داشبورد وب React

## نتایج
- کاهش ۳۵٪ مصرف برق سرمایش
- کاهش ۲۸٪ مصرف گاز زمستانه
- بازگشت سرمایه در ۸ ماه`,
    image: '',
    technologies: ['Python', 'Raspberry Pi', 'MQTT', 'React', 'Node.js', 'SQLite', 'TensorFlow Lite'],
    keyTechnologies: ['TensorFlow Lite', 'MQTT'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    gallery: [],
  },
  {
    id: 'cfd-analysis-toolbox',
    title: 'جعبه‌ابزار تحلیل CFD',
    titleEn: 'CFD Analysis Toolbox',
    description: 'کتابخانه پایتون برای پیش‌پردازش و پس‌پردازش نتایج شبیه‌سازی دینامیک سیالات محاسباتی با OpenFOAM.',
    descriptionFull: `کتابخانه‌ای برای ساده‌سازی فرآیند شبیه‌سازی CFD با OpenFOAM.

## ویژگی‌ها
- تولید خودکار مش (Mesh Generation)
- تنظیم شرایط مرزی
- پس‌پردازش و استخراج نتایج
- مقایسه نتایج با داده‌های تجربی

## مثال استفاده
\`\`\`python
from cfd_toolbox import Simulation, PostProcessor

sim = Simulation('pipe_flow')
sim.set_mesh(refinement=3)
sim.set_boundary_conditions(inlet_velocity=5.0)
sim.run(turbulence_model='k-omega SST')

post = PostProcessor(sim.results)
post.plot_velocity_contour(plane='xy')
\`\`\``,
    image: '',
    technologies: ['Python', 'OpenFOAM', 'Matplotlib', 'NumPy', 'ParaView'],
    keyTechnologies: ['OpenFOAM', 'Python'],
    githubUrl: 'https://github.com',
    gallery: [],
  },
  {
    id: 'robotics-arm-simulation',
    title: 'شبیه‌سازی بازوی رباتیک ۶ درجه آزادی',
    titleEn: '6-DOF Robotic Arm Simulation',
    description: 'شبیه‌سازی سینماتیک و دینامیک بازوی رباتیک با ROS و پایتون برای کاربردهای صنعتی.',
    descriptionFull: `شبیه‌سازی کامل بازوی رباتیک ۶-DOF با تمرکز بر کاربردهای جوشکاری و مونتاژ صنعتی.

## بخش‌ها
- سینماتیک مستقیم و معکوس
- برنامه‌ریزی مسیر با RRT
- کنترل PID
- شبیه‌سازی در Gazebo

## ابزارها
- ROS2, Gazebo, MoveIt2, Python, NumPy`,
    image: '',
    technologies: ['Python', 'ROS2', 'Gazebo', 'MoveIt2', 'NumPy', 'OpenCV'],
    keyTechnologies: ['ROS2', 'MoveIt2'],
    githubUrl: 'https://github.com',
    gallery: [],
  },
]