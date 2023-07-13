class SbomComponent < ApplicationRecord
    include ActiveModel::Serializers::JSON
    belongs_to :sbom
    has_many :properties, dependent: :destroy
    serialize :properties, Array
end
