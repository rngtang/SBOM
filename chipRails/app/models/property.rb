class Property < ApplicationRecord
    # One-to-one associations
    belongs_to :sbomComponent, optional: true
end
