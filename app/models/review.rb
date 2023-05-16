class Review < ApplicationRecord
    validates :comment, presence:true, length: { minimum: 10, message: "should be at least 10 characters" }
    validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }

    belongs_to :user
    belongs_to :recipe
end
