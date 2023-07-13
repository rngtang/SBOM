class Property < ApplicationRecord
    belongs_to :sbomComponent, optional: true
end
