class Library < ApplicationRecord
    belongs_to :user
    has_many :genes

    validates :user_id, presence: true, uniqueness: true
end
