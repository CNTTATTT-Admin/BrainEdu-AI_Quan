# 🧠 BrainEdu-AI — Hướng dẫn cài đặt & chạy dự án

> Hệ thống học tập cá nhân hóa bằng AI  
> Repo: https://github.com/CNTTATTT-Admin/BrainEdu-AI_Quan

---

## 📋 Yêu cầu hệ thống

| Công cụ | Phiên bản tối thiểu |
|---|---|
| [Docker](https://docs.docker.com/get-docker/) | 24+ |
| [Docker Compose](https://docs.docker.com/compose/install/) | 2.0+ |
| [Python](https://www.python.org/downloads/) | 3.10+ |
| [Node.js](https://nodejs.org/) | 18+ |
| [Java JDK](https://adoptium.net/) | 17+ |
| Git | bất kỳ |

> **Lưu ý:** Nếu chạy toàn bộ qua Docker thì chỉ cần Docker & Docker Compose. Python/Node/Java chỉ cần khi chạy từng service riêng lẻ.

---

## 🗂️ Cấu trúc dự án

```
BrainEdu-AI_Quan/
├── BrainEduAI/          # AI Service (Python, port 8000)
├── BrainEduAdmin/       # Trang quản trị (TypeScript)
├── BrainEduBackend/     # API Backend (Java Spring Boot, port 8080)
├── BrainEduFrontend/    # Giao diện người dùng (ReactJS, port 5173)
├── docker-compose.yml
└── .gitignore
```

---

## ⚙️ Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/CNTTATTT-Admin/BrainEdu-AI_Quan.git
cd BrainEdu-AI_Quan
```

### 2. Tạo file `.env`

Tạo file `.env` ở thư mục gốc dự án:

```env
# Database
MYSQL_ROOT_PASSWORD=your_strong_password
MYSQL_DATABASE=brainedu

# JWT
JWT_SECRET=your_jwt_secret_key_at_least_32_chars
```

> ⚠️ Không commit file `.env` lên Git. File này đã được thêm vào `.gitignore`.

---

## 🚀 Cách 1: Chạy toàn bộ bằng Docker Compose (Khuyến nghị)

Cách này khởi động tất cả services cùng lúc: MySQL, Redis, MinIO, Backend, Frontend.

```bash
docker-compose up --build
```

Lần đầu chạy sẽ mất vài phút để build image. Những lần sau chạy nhanh hơn:

```bash
docker-compose up
```

Chạy nền (background):

```bash
docker-compose up -d
```

### Kiểm tra trạng thái

```bash
docker-compose ps
```

### Dừng dự án

```bash
docker-compose down
```

Dừng và xóa toàn bộ dữ liệu (volumes):

```bash
docker-compose down -v
```

---

## 🌐 Địa chỉ truy cập sau khi chạy

| Service | URL | Ghi chú |
|---|---|---|
| Frontend | http://localhost:5173 | Giao diện người dùng |
| Backend API | http://localhost:8080 | REST API (Spring Boot) |
| AI Service | http://localhost:8000 | Python AI service |
| MinIO Console | http://localhost:9001 | Quản lý file storage |
| MySQL | localhost:3307 | User: `root` |
| Redis | localhost:6379 | — |

**MinIO mặc định:**
- Username: `admin`
- Password: `password123`

---

## 🔧 Cách 2: Chạy từng service riêng lẻ (Development)

### Bước 1 — Khởi động hạ tầng (DB, Cache, Storage)

```bash
docker-compose up mysql redis minio -d
```

### Bước 2 — Chạy AI Service (Python)

```bash
cd BrainEduAI

# Tạo virtual environment
python -m venv venv

# Kích hoạt venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Cài dependencies
pip install -r requirements.txt

# Chạy service
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

AI Service sẽ chạy tại: http://localhost:8000

### Bước 3 — Chạy Backend (Java Spring Boot)

```bash
cd BrainEduBackend

# Cấp quyền (macOS/Linux)
chmod +x mvnw

# Chạy với profile local
./mvnw spring-boot:run -Dspring-boot.run.profiles=local

# Hoặc trên Windows:
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=local
```

Backend API sẽ chạy tại: http://localhost:8080

### Bước 4 — Chạy Frontend (ReactJS)

```bash
cd BrainEduFrontend

# Cài dependencies
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: http://localhost:5173

---

## 🛠️ Một số lệnh hữu ích

### Xem log của một service cụ thể

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f brainedu-mysql
```

### Rebuild một service sau khi thay đổi code

```bash
docker-compose up --build backend
```

### Truy cập MySQL trong container

```bash
docker exec -it brainedu-mysql mysql -u root -p
# Nhập MYSQL_ROOT_PASSWORD khi được hỏi
```

### Truy cập Redis CLI

```bash
docker exec -it brainedu-redis redis-cli
```

---

## ❗ Xử lý lỗi thường gặp

**Lỗi: Port đã được sử dụng**
```
Error: port is already allocated
```
Kiểm tra và tắt tiến trình đang dùng port đó, hoặc đổi port mapping trong `docker-compose.yml`.

**Lỗi: Backend không kết nối được MySQL**

Đảm bảo MySQL đã khởi động hoàn toàn trước khi backend start. Chạy lại:
```bash
docker-compose restart backend
```

**Lỗi: AI Service không nhận được request từ Backend**

Kiểm tra `AI_SERVICE_URL` trong `docker-compose.yml` đang trỏ đúng:
```yaml
- AI_SERVICE_URL=http://host.docker.internal:8000
```
Trên Linux, đảm bảo `extra_hosts` có dòng `host.docker.internal:host-gateway`.

---

## 📦 Công nghệ sử dụng

- **AI Service**: Python · FastAPI/Flask
- **Backend**: Java 17 · Spring Boot · Spring Security · JWT · JPA
- **Frontend**: ReactJS · TypeScript · Vite
- **Database**: MySQL 8.0
- **Cache**: Redis 7
- **Storage**: MinIO (S3-compatible)
- **Container**: Docker · Docker Compose
