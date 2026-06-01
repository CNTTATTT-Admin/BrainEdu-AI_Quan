import json
import time
import requests

API_URL = "http://localhost:8080/api/v1/answers"

TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBicmFpbmVkdS5jb20iLCJpYXQiOjE3ODAyNzY1MjAsImV4cCI6MTc4MDM2MjkyMH0.9fATtMx-voQ0T4ZxEehcZvVzpgIaHZRfDh4kV0niCwQ"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {TOKEN}"
}
DATA_ARRAY = [
  {
    "questionId": 566,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 566,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 567,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 567,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 568,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 568,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 569,
    "answerText": "4 loại (Hình sự, Hành chính, Dân sự, Kỷ luật)",
    "isCorrect": True
  },
  {
    "questionId": 569,
    "answerText": "3 loại (Hình sự, Hành chính, Dân sự)",
    "isCorrect": False
  },
  {
    "questionId": 569,
    "answerText": "2 loại (Hình sự, Dân sự)",
    "isCorrect": False
  },
  {
    "questionId": 569,
    "answerText": "5 loại (Hình sự, Hành chính, Dân sự, Kỷ luật, Trách nhiệm vật chất)",
    "isCorrect": False
  },
  {
    "questionId": 570,
    "answerText": "Đủ 18 tuổi trở lên",
    "isCorrect": True
  },
  {
    "questionId": 570,
    "answerText": "Đủ 21 tuổi trở lên",
    "isCorrect": False
  },
  {
    "questionId": 570,
    "answerText": "Đủ 16 tuổi trở lên",
    "isCorrect": False
  },
  {
    "questionId": 570,
    "answerText": "Từ 18 tuổi trở lên (không cần đủ)",
    "isCorrect": False
  },
  {
    "questionId": 571,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 571,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 572,
    "answerText": "Đúng",
    "isCorrect": False
  },
  {
    "questionId": 572,
    "answerText": "Sai",
    "isCorrect": True
  },
  {
    "questionId": 573,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 573,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 574,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 574,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 575,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 575,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 576,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 576,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 577,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 577,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 578,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 578,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 579,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 579,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 580,
    "answerText": "Tổ chức Thương mại Thế giới",
    "isCorrect": True
  },
  {
    "questionId": 580,
    "answerText": "Quỹ Tiền tệ Quốc tế",
    "isCorrect": False
  },
  {
    "questionId": 580,
    "answerText": "Ngân hàng Thế giới",
    "isCorrect": False
  },
  {
    "questionId": 580,
    "answerText": "Tổ chức Y tế Thế giới",
    "isCorrect": False
  },
  {
    "questionId": 581,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 581,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 582,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 582,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 583,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 583,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 584,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 584,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 585,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 585,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 586,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 586,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 587,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 587,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 588,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 588,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 589,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 589,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 590,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 590,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 591,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 591,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 592,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 592,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 593,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 593,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 594,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 594,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 595,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 595,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 596,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 596,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 597,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 597,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 598,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 598,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 599,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 599,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 600,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 600,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 601,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 601,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 602,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 602,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 603,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 603,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 604,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 604,
    "answerText": "Sai",
    "isCorrect": False
  },
  {
    "questionId": 605,
    "answerText": "Đúng",
    "isCorrect": True
  },
  {
    "questionId": 605,
    "answerText": "Sai",
    "isCorrect": False
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