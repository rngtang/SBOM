class Sbom < ApplicationRecord
    # you might need things like these next two lines to deal with your arrays inside the sbom jsons
    # you'll have to do some testing/experimentation/research here
    include ActiveModel::Serializers::JSON
    serialize :metadata, Object

    serialize :vulnerabilities, Array

    belongs_to :user, optional: true
    has_many :metadata, dependent: :destroy
    has_many :sbom_components, dependent: :destroy
    has_many :dependencies, dependent: :destroy
    has_many :vulnerabilities, dependent: :destroy
    serialize :sbom_components, Array #Added the serialize
    serialize :dependencies, Array
end
