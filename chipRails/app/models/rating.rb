class Rating < ApplicationRecord
    # One-to-one associations
    belongs_to :vulnerability
    has_one :source, dependent: :destroy
end
