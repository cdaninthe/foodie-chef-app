class User < ApplicationRecord
    validates :username, presence: true
    validates :password, length: { minimum: 8, message: 'should be at least 8 characters' }, confirmation: true
    validates :password_confirmation, presence: true 
    
    has_secure_password

    has_many :reviews, dependent: :destroy
    has_many :recipes, through: :reviews
    # has_many :recipes, dependent: :destroy
    # has has_many :recipes, :foreign_key => 'owner_id', dependent: destroy
end
