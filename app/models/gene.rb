class Gene < ApplicationRecord
    belongs_to :library
    has_many :annotations

    validates :library_id, presence: true
    validates :symbol, presence: true, uniqueness: true
    validates :taxon, presence: true
end
