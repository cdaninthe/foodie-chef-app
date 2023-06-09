class Recipe < ApplicationRecord
    validates :title, presence: true
    validates :category, presence: true
    validates :total_time, presence: true
    validates :difficulty, presence: true
    validates :servings, presence: true
    validates :ingredients, presence:true, length: { minimum: 5, message: "should be at least 5 characters" }
    validates :directions, presence:true, length: { minimum: 10, message: "should be at least 10 characters" }
    
    
    has_many :reviews, dependent: :destroy
    has_many :users, through: :reviews
    has_many :bookmarks, dependent: :destroy

    belongs_to :chef, class_name: "User"
    # belongs_to :chef, class_name: "User", foreign_key: "chef_id"
    # belongs_to :chef, class_name: "User", foreign_key: :user_id
end
