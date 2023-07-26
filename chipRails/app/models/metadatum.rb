class Metadatum < ApplicationRecord
    include ActiveModel::Serializers::JSON

    # One-to-one associations
    belongs_to :sbom
    has_many :tools, dependent: :destroy

    # Makes tools an array
    serialize :tools, Array
end
