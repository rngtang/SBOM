class Dependency < ApplicationRecord
    belongs_to :sbom
    has_many :licenses , dependent: :destroy
    has_many :sub_components, dependent: :destroy
    has_many :properties, dependent: :destroy
end
