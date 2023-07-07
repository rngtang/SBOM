class ExternalReference < ApplicationRecord
    belongs_to :sbomComponent, optional: true
end
