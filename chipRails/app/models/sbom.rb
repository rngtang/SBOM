class Sbom < ApplicationRecord
    belongs_to :user, optional: true
    has_many :metadata, dependent: :destroy
    has_many :dependencies, dependent: :destroy
end
