class Metadatum < ApplicationRecord
    belongs_to :sbom
    has_many :tools
    has_many :components
end
