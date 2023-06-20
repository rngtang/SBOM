class Sbom < ApplicationRecord
    has_one :metad
    has_many :dependency
    belongs_to :user
end