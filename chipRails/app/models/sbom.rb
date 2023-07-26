class Sbom < ApplicationRecord
    include ActiveModel::Serializers::JSON

    # One-to-one associations
    belongs_to :user, optional: true
    has_many :metadata, dependent: :destroy
    has_many :sbom_components, dependent: :destroy
    has_many :dependencies, dependent: :destroy

    # Many-to-many associations
    has_and_belongs_to_many :vulnerabilities
    has_and_belongs_to_many :sbom_components

    # Creates arrays
    serialize :vulnerabilities, Array
    serialize :sbom_components, Array 
    serialize :dependencies, Array
    serialize :metadata, Object

    # Method to count the number of vulnerabilities
    def vuln_number
        vulnerabilities.count
    end

end
