class Rating < ApplicationRecord
    belongs_to :vulnerability
    has_one :source
end
