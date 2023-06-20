class Dependency < ApplicationRecord
    has_many :license, :sub_component, :property
    belongs_to :sbom
end
