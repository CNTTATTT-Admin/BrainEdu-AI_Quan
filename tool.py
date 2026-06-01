import json
import time
import requests

API_URL = "http://localhost:8080/api/v1/roadmaps/10/courses"

TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBicmFpbmVkdS5jb20iLCJpYXQiOjE3ODAyNzY1MjAsImV4cCI6MTc4MDM2MjkyMH0.9fATtMx-voQ0T4ZxEehcZvVzpgIaHZRfDh4kV0niCwQ"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {TOKEN}"
}
DATA_ARRAY = [
  {
    "courseId": 7,
    "orderIndex": 1,
    "requiredCourse": True,
    "estimatedWeek": 3
  },
  {
    "courseId": 8,
    "orderIndex": 2,
    "requiredCourse": True,
    "estimatedWeek": 5
  },
  {
    "courseId": 9,
    "orderIndex": 3,
    "requiredCourse": True,
    "estimatedWeek": 8
  }
]
def post_data_chunks(url, headers, data_list):
    success_count = 0
    fail_count = 0

    print(f"Bắt đầu đẩy {len(data_list)} đối tượng lên API...\n")

    for index, item in enumerate(data_list, start=1):
        try:
            response = requests.post(url, headers=headers, json=item, timeout=10)

            if response.status_code in [200, 201]:
                print(f"[{index}/{len(data_list)}] Thành công! Thêm: {item.get('name', index)}")
                success_count += 1
            else:
                print(
                    f"[{index}/{len(data_list)}] Thất bại! Mã lỗi: {response.status_code} - Phản hồi: {response.text}"
                )
                fail_count += 1

        except requests.exceptions.RequestException as e:
            print(f"[{index}/{len(data_list)}] Lỗi kết nối: {e}")
            fail_count += 1

        time.sleep(0.1)

    print("\n--- KẾT QUẢ HOÀN THÀNH ---")
    print(f"Tổng số: {len(data_list)}")
    print(f"Thành công: {success_count}")
    print(f"Thất bại: {fail_count}")


if __name__ == "__main__":
    post_data_chunks(API_URL, HEADERS, DATA_ARRAY)