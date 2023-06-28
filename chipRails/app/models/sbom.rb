class Sbom < ApplicationRecord
<<<<<<< HEAD
    belongs_to :user, optional: true
    has_many :metadata, dependent: :destroy
    has_many :dependencies, dependent: :destroy
=======
    belongs_to :user
    has_many :metadata
    has_many :dependencies
    has_many :children
    has_many :vulnerabilities
>>>>>>> 10-expandDatabase
end
