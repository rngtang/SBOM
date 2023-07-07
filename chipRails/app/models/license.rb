class License < ApplicationRecord
    belongs_to :sbomComponent, optional: true
end
