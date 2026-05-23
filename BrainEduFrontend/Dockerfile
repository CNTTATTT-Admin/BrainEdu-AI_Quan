# Sử dụng Node.js bản ổn định
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file quản lý thư viện vào trước để tận dụng cache của Docker
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install --legacy-peer-deps

# Copy toàn bộ mã nguồn vào container
COPY . .

# Khai báo cổng mặc định của Vite
EXPOSE 5173

# Chạy ứng dụng ở chế độ phát triển
CMD ["npm", "run", "dev", "--", "--host"]