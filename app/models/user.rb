class User < ApplicationRecord
    has_one :library
    has_many :genes, through: :library

    validates :username, presence: true, uniqueness: true, length: { minimum: 6 }
    validates :password, presence: true, length: { minimum: 6 }
    validates :email, presence: true, uniqueness: true
end
