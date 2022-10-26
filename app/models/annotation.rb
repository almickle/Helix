class Annotation < ApplicationRecord
    belongs_to :gene

    validates :gene_id, presence: true
    validates :title, presence: true
    validates :body, presence: true
    validates :begin, presence: true
    validates :end, presence: true
    validates :transcript, presence: true
    validates :protein, inclusion: { in: [ true, false ] }

end
