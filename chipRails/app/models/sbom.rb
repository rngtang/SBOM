class Sbom < ApplicationRecord
    belongs_to :user
    has_many :metadata
    has_many :dependencies
    has_many :children
    has_many :vulnerabilities
end
