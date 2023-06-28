class Rating < ApplicationRecord
    belongs_to :vulnerability
    has_one :source, dependent: :destroy
end
