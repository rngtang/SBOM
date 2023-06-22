class Sbom < ApplicationRecord
    belongs_to :user
    has_many :metadata
    has_many :dependencies
end
