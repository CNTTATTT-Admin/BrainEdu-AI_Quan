import React, { useState } from "react";

type Props = {
  onFilterChange: (filters: any) => void;
};

const FilterSidebar: React.FC<Props> = ({ onFilterChange }) => {
  const [level, setLevel] = useState<string>("");
  const [price, setPrice] = useState<string>("all");
  const [rating, setRating] = useState<boolean>(false);
  const [duration, setDuration] = useState<string>("all");
  const [sort, setSort] = useState<string>("newest");

  const applyFilters = (overrides: any) => {
    const currentLevel = overrides.hasOwnProperty("level") ? overrides.level : level;
    const currentPrice = overrides.hasOwnProperty("price") ? overrides.price : price;
    const currentDuration = overrides.hasOwnProperty("duration") ? overrides.duration : duration;
    const currentRating = overrides.hasOwnProperty("rating") ? overrides.rating : rating;
    const currentSort = overrides.hasOwnProperty("sort") ? overrides.sort : sort;

    let minPrice;
    let maxPrice;
    if (currentPrice === "free") {
      minPrice = 0;
      maxPrice = 0;
    } else if (currentPrice === "paid") {
      minPrice = 1;
    }

    let minDuration;
    let maxDuration;
    if (currentDuration === "short") maxDuration = 5;
    if (currentDuration === "medium") {
      minDuration = 5;
      maxDuration = 15;
    }
    if (currentDuration === "long") {
      minDuration = 15;
    }

    let sortBy = "createdAt";
    let sortDirection: "asc" | "desc" = "desc";
    if (currentSort === "popular") sortBy = "enrolledCount";
    if (currentSort === "price_asc") {
      sortBy = "price";
      sortDirection = "asc";
    }
    if (currentSort === "price_desc") {
      sortBy = "price";
      sortDirection = "desc";
    }

    onFilterChange({
      level: currentLevel || undefined,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      minRating: currentRating ? 4 : undefined,
      sortBy,
      sortDirection,
    });
  };

  const handleLevelChange = (value: string) => {
    const newValue = level === value ? "" : value;
    setLevel(newValue);
    applyFilters({ level: newValue });
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    applyFilters({ price: value });
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    applyFilters({ duration: value });
  };

  const handleRatingChange = () => {
    const newValue = !rating;
    setRating(newValue);
    applyFilters({ rating: newValue });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    applyFilters({ sort: value });
  };

  return (
    <div className="w-full md:w-60 space-y-6 text-gray-700">
      <div>
        <h5 className="text-xs font-bold uppercase mb-2">Trình độ</h5>
        <div className="space-y-2">
          {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((lvl) => (
            <label key={lvl} className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="radio"
                name="level"
                checked={level === lvl}
                onChange={() => handleLevelChange(lvl)}
                onClick={(e) => {
                  if (level === lvl) {
                    handleLevelChange(lvl);
                  }
                }}
              />
              {lvl}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-xs font-bold uppercase mb-2">Giá</h5>
        <div className="space-y-2">
          {[
            { label: "Tất cả", value: "all" },
            { label: "Miễn phí", value: "free" },
            { label: "Trả phí", value: "paid" },
          ].map((p) => (
            <label key={p.value} className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={price === p.value}
                onChange={() => handlePriceChange(p.value)}
              />
              {p.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-xs font-bold uppercase mb-2">Thời lượng</h5>
        <div className="space-y-2">
          {[
            { label: "Tất cả", value: "all" },
            { label: "Ngắn (< 5 giờ)", value: "short" },
            { label: "Trung bình (5 - 15 giờ)", value: "medium" },
            { label: "Dài (> 15 giờ)", value: "long" },
          ].map((d) => (
            <label key={d.value} className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="radio"
                name="duration"
                checked={duration === d.value}
                onChange={() => handleDurationChange(d.value)}
              />
              {d.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-xs font-bold uppercase mb-2">Đánh giá</h5>
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={rating}
            onChange={handleRatingChange}
          />
          ⭐ 4.0 trở lên
        </label>
      </div>

      <div>
        <h5 className="text-xs font-bold uppercase mb-2">Sắp xếp</h5>
        <div className="space-y-2">
          {[
            { label: "Mới nhất", value: "newest" },
            { label: "Phổ biến", value: "popular" },
            { label: "Giá tăng dần", value: "price_asc" },
            { label: "Giá giảm dần", value: "price_desc" },
          ].map((s) => (
            <label key={s.value} className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={sort === s.value}
                onChange={() => handleSortChange(s.value)}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;