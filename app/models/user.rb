class User < ApplicationRecord
    validates :username, presence: true
    # validates :password, length: { minimum: 8, message: 'should be at least 8 characters' }, confirmation: true
    # validates :password_confirmation, presence: true 
    
    # has_secure_password

    has_many :reviews, dependent: :destroy
    has_many :recipes, through: :reviews
    has_many :bookmarks, dependent: :destroy

    has_many :chef_recipes, class_name: "Recipe", :foreign_key => "chef_id"
    # has_many :recipes, dependent: :destroy
end
