class SbomComponent < ApplicationRecord
    belongs_to :sbom
    has_many :licenses , dependent: :destroy
    has_many :properties, dependent: :destroy
    has_many :externalReferences, dependent: :destroy
end
