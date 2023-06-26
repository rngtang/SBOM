class Dependency < ApplicationRecord
    belongs_to :sbom
    has_many :licenses
    has_many :sub_components
    has_many :properties
    has_many :externalReferences
end
