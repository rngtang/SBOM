class Dependency < ApplicationRecord
    belongs_to :sbom
<<<<<<< HEAD
    has_many :licenses , dependent: :destroy
    has_many :sub_components, dependent: :destroy
    has_many :properties, dependent: :destroy
=======
    has_many :licenses
    has_many :sub_components
    has_many :properties
    has_many :externalReferences
>>>>>>> 10-expandDatabase
end
