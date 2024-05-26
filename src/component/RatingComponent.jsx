/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';

function RatingComponent() {
    const [selectedRating, setSelectedRating] = useState(null);

    const handleRatingChange = (event) => {
        setSelectedRating(event.target.value);
    };

    return (
        <div className="rating rating-lg">
            {[1, 2, 3, 4, 5].map((rating) => (
                <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    value={rating}
                    checked={selectedRating === rating.toString()}
                    onChange={handleRatingChange}
                />
            ))}
        </div>
    );
}

export default RatingComponent;