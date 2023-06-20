class Sbom < ApplicationRecord
    has_one :metadatum
    has_many :dependency
    belongs_to :user
end