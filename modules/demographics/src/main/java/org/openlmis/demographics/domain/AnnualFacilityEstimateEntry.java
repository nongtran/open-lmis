/*
 * Electronic Logistics Management Information System (eLMIS) is a supply chain management system for health commodities in a developing country setting.
 *
 * Copyright (C) 2015  John Snow, Inc (JSI). This program was produced for the U.S. Agency for International Development (USAID). It was prepared under the USAID | DELIVER PROJECT, Task Order 4.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package org.openlmis.demographics.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.openlmis.core.domain.BaseModel;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnnualFacilityEstimateEntry extends BaseModel {

  private Integer year;
  private Long facilityId;
  private Long programId;
  private Boolean isFinal;
  private Long demographicEstimateId;
  private EstimateCategory category;
  private Double conversionFactor;
  private Long value;

  public void calculateAndSetValue(Long populationValue) {
    Double calculatedValue = conversionFactor * populationValue / 100;
    value = calculatedValue.longValue();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;

    if (!(o instanceof AnnualFacilityEstimateEntry))
      return false;

    AnnualFacilityEstimateEntry that = (AnnualFacilityEstimateEntry) o;

    return new EqualsBuilder()
        .append(id, that.id)
        .isEquals();
  }

  @Override
  public int hashCode() {
    return new HashCodeBuilder(17, 37)
        .append(id)
        .toHashCode();
  }
}
