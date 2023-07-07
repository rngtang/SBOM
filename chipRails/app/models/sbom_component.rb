class SbomComponent < ApplicationRecord
    include ActiveModel::Serializers::JSON
    belongs_to :sbom
    has_many :licenses , dependent: :destroy
    has_many :properties, dependent: :destroy
    has_many :externalReferences, dependent: :destroy
    serialize :properties, Array
    serialize :externalReferences, Array
    serialize :licenses, Array
end
